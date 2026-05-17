document.addEventListener("DOMContentLoaded", function () {
  const commentsList = document.querySelector(".comments-list");

  // =========================
  // REPLY + CANCEL + SUBMIT (EVENT DELEGATION)
  // =========================
  if (commentsList) {
    commentsList.addEventListener("click", function (e) {
      const replyBtn = e.target.closest(".reply-btn");
      const cancelBtn = e.target.closest(".cancel-reply");
      const submitBtn = e.target.closest(".submit-reply");

      // =========================
      // OPEN REPLY FORM
      // =========================
      if (replyBtn) {
        const commentItem = replyBtn.closest(".comment-item");

        // nếu đã có form thì không tạo nữa
        const existingForm = commentItem.querySelector(".reply-form");
        if (existingForm) {
          existingForm.remove();
          return;
        }

        // đóng các form khác (chỉ trong list)
        commentsList.querySelectorAll(".reply-form").forEach((f) => f.remove());

        const replyForm = document.createElement("div");
        replyForm.className = "reply-form mt-3";
        replyForm.innerHTML = `
          <div class="card border-0 shadow-sm p-3">
            <h6 class="fw-bold mb-3">Reply to comment</h6>
            <div class="mb-2">
              <input type="text" class="form-control form-control-sm reply-name" placeholder="Your name">
            </div>
            <div class="mb-2">
              <textarea class="form-control form-control-sm reply-message" rows="2" placeholder="Your reply..."></textarea>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-primary btn-sm submit-reply">Post Reply</button>
              <button class="btn btn-secondary btn-sm cancel-reply">Cancel</button>
            </div>
          </div>
        `;

        commentItem.querySelector(".flex-grow-1").appendChild(replyForm);
      }

      // =========================
      // CANCEL REPLY
      // =========================
      if (cancelBtn) {
        cancelBtn.closest(".reply-form")?.remove();
      }

      // =========================
      // SUBMIT REPLY
      // =========================
      if (submitBtn) {
        const form = submitBtn.closest(".reply-form");
        const commentItem = submitBtn.closest(".comment-item");

        const name = form.querySelector(".reply-name").value.trim();
        const message = form.querySelector(".reply-message").value.trim();

        if (!name || !message) return;

        const nested = document.createElement("div");
        nested.className = "d-flex gap-3 mt-3 ms-4";
        nested.innerHTML = `
          <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(
            name
          )}&background=6366f1&color=fff"
               class="rounded-circle flex-shrink-0" width="40" height="40" alt="${name}">
          <div class="flex-grow-1">
            <div class="bg-white rounded-3 p-3 shadow-sm border-start border-primary border-3">
              <div class="d-flex justify-content-between mb-2">
                <h6 class="fw-bold mb-0 text-primary">${name}</h6>
                <small class="text-muted">Just now</small>
              </div>
              <p class="mb-0 text-muted">${message}</p>
            </div>
          </div>
        `;

        commentItem.querySelector(".flex-grow-1").appendChild(nested);
        form.remove();
      }
    });
  }

  // =========================
  // ADD NEW COMMENT
  // =========================
  const commentForm = document.getElementById("commentForm");

  if (commentForm) {
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("commentName").value.trim();
      const message = document.getElementById("commentText").value.trim();

      if (!name || !message) return;

      const list = document.querySelector(".comments-list");

      const newComment = document.createElement("div");
      newComment.className = "comment-item d-flex gap-3 mb-4";

      newComment.innerHTML = `
        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=6366f1&color=fff"
             class="rounded-circle flex-shrink-0" width="50" height="50" alt="${name}">
        <div class="flex-grow-1">
          <div class="bg-white rounded-3 p-3 shadow-sm">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="fw-bold mb-0">${name}</h6>
              <small class="text-muted">Just now</small>
            </div>
            <p class="mb-0 text-muted">${message}</p>
          </div>
          <div class="mt-2">
            <button class="btn btn-sm btn-outline-primary reply-btn">
              <i class="bi bi-reply me-1"></i>Reply
            </button>
          </div>
        </div>
      `;

      list.prepend(newComment);
      commentForm.reset();
    });
  }
});