import { useEffect, useState } from "react";
// import { apiUrl } from "../utils/api.js";
import { mediaUrl } from "../utils/media.js";
import api from "../api/axios.js";

const emptyProject = {
  title: "",
  description: "",
  live: "",
  code: "",
  image: null,
};
const emptyAchievement = { title: "", issuer: "", description: "", images: [] };

async function readJson(response) {
  return response.json().catch(() => ({}));
}

function UploadField({
  label,
  name,
  type = "text",
  required = true,
  multiple = false,
  hint,
  onChange,
}) {
  return (
    <label>
      <span>{label}</span>
      <input
        name={name}
        type={type}
        accept={type === "file" ? "image/*" : undefined}
        required={required}
        multiple={multiple}
        onChange={onChange}
      />
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

export default function AdminPanel({
  onClose,
  onContentAdded,
  onContentDeleted,
}) {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(
    () => sessionStorage.getItem("adminToken") || "",
  );
  const [contacts, setContacts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [toast, setToast] = useState(null);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [achievementForm, setAchievementForm] = useState(emptyAchievement);
  const [projectFormKey, setProjectFormKey] = useState(0);
  const [achievementFormKey, setAchievementFormKey] = useState(0);
  const [uploading, setUploading] = useState({
    project: false,
    achievement: false,
  });

  const isLoggedIn = Boolean(token);

  const loadContacts = async () => {
    try {
      const response = await api.get("/api/admin/contacts");
      setContacts(response.data);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Could not load contacts.",
      );
    }
  };

  const loadAdminContent = async () => {
    try {
      const [projectResponse, achievementResponse] = await Promise.all([
        api.get("/api/admin/projects"),
        api.get("/api/admin/achievements"),
      ]);


      setProjects(projectResponse.data);
      setAchievements(achievementResponse.data);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Could not load admin content.",
      );
    }
  };

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (!isLoggedIn) return;
    Promise.all([loadContacts(), loadAdminContent()]).catch((error) => {
      setToast({ type: "error", text: error.message });
    });
  }, [isLoggedIn]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setToast(null);

    try {
      const { data } = await api.post("/api/admin/login", {
        password,
      });

      sessionStorage.setItem("adminToken", data.token);
      setToken(data.token);
      setPassword("");
      setToast({
        type: "success",
        text: "Admin login successful.",
      });
    } catch (error) {
      setToast({
        type: "error",
        text: error.response?.data?.message || "Admin login failed.",
      });
    }
  };

  const uploadContent = async (event, type) => {
    event.preventDefault();
    const formElement = event.currentTarget;

    setToast(null);
    setUploading((prev) => ({
      ...prev,
      [type]: true,
    }));

    const form = type === "project" ? projectForm : achievementForm;

    const body = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => body.append(key, item));
      } else if (value !== null && value !== undefined) {
        body.append(key, value);
      }
    });

    try {
      const { data } = await api.post(
        `/api/admin/${type === "project" ? "projects" : "achievements"}`,
        body,
      );


      setToast({
        type: "success",
        text: `${type === "project" ? "Project" : "Achievement"} saved and added to the website.`,
      });

      onContentAdded(type, data);

      if (type === "project") {
        setProjects((items) => [data, ...items]);
        setProjectForm(emptyProject);
        setProjectFormKey((key) => key + 1);
      }

      if (type === "achievement") {
        setAchievements((items) => [data, ...items]);
        setAchievementForm(emptyAchievement);
        setAchievementFormKey((key) => key + 1);
      }

      formElement.reset();
    } catch (error) {
      setToast({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          `Could not save ${type}.`,
      });
    } finally {
      setUploading((prev) => ({
        ...prev,
        [type]: false,
      }));
    }
  };

  const deleteContent = async (type, id) => {
    setToast(null);

    try {
      const { data } = await api.delete(
        `/api/admin/${type === "project" ? "projects" : "achievements"}/${id}`,
      );

      if (type === "project") {
        setProjects((items) => items.filter((item) => item._id !== id));
      }

      if (type === "achievement") {
        setAchievements((items) => items.filter((item) => item._id !== id));
      }

      onContentDeleted(type, id);

      setToast({
        type: "success",
        text:
          data.message ||
          `${type === "project" ? "Project" : "Achievement"} deleted.`,
      });
    } catch (error) {
      setToast({
        type: "error",
        text: error.response?.data?.message || `Could not delete ${type}.`,
      });
    }
  };


  const handleLogout = () => {
  sessionStorage.removeItem("adminToken");
  setToken(null);
  setToast({
    type: "success",
    text: "Logout successful.",
  });

  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
};

  return (
    <div className="admin-modal">
      <div
        className="admin-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="adminTitle"
      >
        <button
          className="admin-close"
          type="button"
          aria-label="Close admin panel"
          onClick={onClose}
        >
          <i className="bx bx-x" />
        </button>
        {isLoggedIn ? 
        <a className="admin-login-link logout-btn" onClick={handleLogout} >Logout</a> : null}
        <h2 id="adminTitle">
          Admin <span>Panel</span>
        </h2>

        {!isLoggedIn ? (
          <form className="admin-login" onSubmit={handleLogin}>
            <label>
              <span>Password</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                required
              />
            </label>
            <button type="submit" className="admin-action">
              Login
            </button>
          </form>
        ) : (
          <div className="admin-grid">
            <section className="admin-box">
              <h3>Contact Messages</h3>
              <div className="admin-contacts">
                {contacts.length ? (
                  contacts.map((contact) => (
                    <article className="admin-contact" key={contact._id}>
                      <strong>{contact.name}</strong>
                      <span>
                        {contact.email} | {contact.mobile}
                      </span>
                      <b>{contact.subject}</b>
                      <p>{contact.message}</p>
                    </article>
                  ))
                ) : (
                  <p>No contact messages found.</p>
                )}
              </div>
            </section>

            <section className="admin-box">
              <h3>Add Project</h3>
              <form
                className="admin-form"
                key={projectFormKey}
                onSubmit={(event) => uploadContent(event, "project")}
              >
                <UploadField
                  label="Project Name"
                  name="title"
                  onChange={(event) =>
                    setProjectForm({
                      ...projectForm,
                      title: event.target.value,
                    })
                  }
                />
                <UploadField
                  label="Description"
                  name="description"
                  onChange={(event) =>
                    setProjectForm({
                      ...projectForm,
                      description: event.target.value,
                    })
                  }
                />
                <UploadField
                  label="GitHub Link"
                  name="code"
                  type="url"
                  onChange={(event) =>
                    setProjectForm({ ...projectForm, code: event.target.value })
                  }
                />
                <UploadField
                  label="Live Link"
                  name="live"
                  type="url"
                  onChange={(event) =>
                    setProjectForm({ ...projectForm, live: event.target.value })
                  }
                />
                <UploadField
                  label="Image"
                  name="image"
                  type="file"
                  onChange={(event) =>
                    setProjectForm({
                      ...projectForm,
                      image: event.target.files[0],
                    })
                  }
                />
                <button
                  type="submit"
                  disabled={uploading.project}
                  className="admin-action"
                >
                  {" "}
                  {uploading.project ? "Uploading..." : "Save Project"}
                </button>
              </form>
            </section>

            <section className="admin-box">
              <h3>Add Achievement</h3>
              <form
                className="admin-form"
                key={achievementFormKey}
                onSubmit={(event) => uploadContent(event, "achievement")}
              >
                <UploadField
                  label="Achievement Name"
                  name="title"
                  onChange={(event) =>
                    setAchievementForm({
                      ...achievementForm,
                      title: event.target.value,
                    })
                  }
                />
                <UploadField
                  label="Issuer"
                  name="issuer"
                  onChange={(event) =>
                    setAchievementForm({
                      ...achievementForm,
                      issuer: event.target.value,
                    })
                  }
                />
                <UploadField
                  label="Description"
                  name="description"
                  onChange={(event) =>
                    setAchievementForm({
                      ...achievementForm,
                      description: event.target.value,
                    })
                  }
                />
                <UploadField
                  label="Images"
                  name="images"
                  type="file"
                  multiple
                  hint="Select at least 2 images for the slider."
                  onChange={(event) =>
                    setAchievementForm({
                      ...achievementForm,
                      images: Array.from(event.target.files),
                    })
                  }
                />
                <button
                  type="submit"
                  disabled={uploading.achievement}
                  className="admin-action"
                >
                  {" "}
                  {uploading.achievement ? "Uploading..." : "Save Achievement"}
                </button>
              </form>
            </section>

            <section className="admin-box admin-wide">
              <h3>Uploaded Projects</h3>
              <div className="admin-items">
                {projects.length ? (
                  projects.map((project) => (
                    <article className="admin-item" key={project._id}>
                      <img src={mediaUrl(project.image)} alt={project.title} />
                      <div>
                        <strong>{project.title}</strong>
                        <p>{project.description}</p>
                        <a href={project.live} target="_blank" rel="noreferrer">
                          Live
                        </a>
                      </div>
                      <button
                        type="button"
                        className="admin-delete"
                        onClick={() => deleteContent("project", project._id)}
                      >
                        <i className="bx bx-trash" />
                        Delete
                      </button>
                    </article>
                  ))
                ) : (
                  <p>No uploaded projects found.</p>
                )}
              </div>
            </section>

            <section className="admin-box admin-wide">
              <h3>Uploaded Achievements</h3>
              <div className="admin-items">
                {achievements.length ? (
                  achievements.map((achievement) => (
                    <article className="admin-item" key={achievement._id}>
                      <img
                        src={mediaUrl(achievement.images[0])}
                        alt={achievement.title}
                      />
                      <div>
                        <strong>{achievement.title}</strong>
                        <span>{achievement.issuer}</span>
                        <p>{achievement.description}</p>
                      </div>
                      <button
                        type="button"
                        className="admin-delete"
                        onClick={() =>
                          deleteContent("achievement", achievement._id)
                        }
                      >
                        <i className="bx bx-trash" />
                        Delete
                      </button>
                    </article>
                  ))
                ) : (
                  <p>No uploaded achievements found.</p>
                )}
              </div>
            </section>
          </div>
        )}

        {toast ? (
          <div
            className={`toast-notification admin-toast ${toast.type}`}
            role="status"
            aria-live="polite"
          >
            <i
              className={`bx ${toast.type === "success" ? "bx-check-circle" : "bx-error-circle"}`}
            />
            <span>{toast.text}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
