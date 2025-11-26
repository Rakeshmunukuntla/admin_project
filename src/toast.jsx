import "./toast.css"; // ⬅ IMPORT CSS HERE

export function showToast(message, type = "success") {
  let container =
    document.querySelector(".toast-container") || createContainer();

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  // Remove after animation
  setTimeout(() => {
    toast.remove();
  }, 2500);
}

function createContainer() {
  const div = document.createElement("div");
  div.className = "toast-container";
  document.body.appendChild(div);
  return div;
}
