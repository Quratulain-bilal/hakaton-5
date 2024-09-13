document.addEventListener("DOMContentLoaded", () => {
  const resumeForm = document.getElementById(
    "resumeForm"
  ) as HTMLFormElement | null;
  const resumeOutput = document.getElementById(
    "resumeOutput"
  ) as HTMLElement | null;
  const skillsSection = document.getElementById(
    "skillsSection"
  ) as HTMLElement | null;
  const toggleButton = document.getElementById(
    "toggleSkills"
  ) as HTMLButtonElement | null;
  const downloadButton = document.getElementById(
    "downloadResume"
  ) as HTMLAnchorElement | null;
  const shareLink = document.getElementById(
    "shareResume"
  ) as HTMLAnchorElement | null;

  let profilePictureURL: string = "";

  // Toggle skills section visibility
  if (toggleButton && skillsSection) {
    let isSkillsVisible: boolean = true;
    toggleButton.addEventListener("click", () => {
      isSkillsVisible = !isSkillsVisible;
      if (skillsSection) {
        skillsSection.style.display = isSkillsVisible ? "block" : "none";
      }
      toggleButton.textContent = isSkillsVisible
        ? "Hide Skills Section"
        : "Show Skills Section";
    });
  }

  // Form submission and resume generation
  resumeForm?.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement)?.value;
    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    const phone = (document.getElementById("phone") as HTMLInputElement)?.value;
    const education = (document.getElementById("education") as HTMLInputElement)
      ?.value;
    const experience = (
      document.getElementById("experience") as HTMLTextAreaElement
    )?.value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement)
      ?.value;
    const website = (document.getElementById("website") as HTMLInputElement)
      ?.value;
    const profilePictureInput = document.getElementById(
      "profile-picture"
    ) as HTMLInputElement | null;

    if (profilePictureInput?.files && profilePictureInput.files.length > 0) {
      const reader = new FileReader();

      // Use onload event handler to load the file
      reader.onload = function (e: ProgressEvent<FileReader>) {
        if (e.target?.result) {
          profilePictureURL = e.target.result as string;
          generateResume(profilePictureURL);
        }
      };

      reader.readAsDataURL(profilePictureInput.files[0]);
    } else {
      generateResume(profilePictureURL); // Continue without profile picture if not selected
    }

    function generateResume(profilePicURL: string) {
      if (resumeOutput) {
        resumeOutput.innerHTML = `
          <h2>Generated Resume</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Education:</strong> ${education}</p>
          <p><strong>Experience:</strong> ${experience}</p>
          <p><strong>Skills:</strong> ${skills}</p>
          <p><strong>Website/Portfolio:</strong> <a href="${website}" target="_blank">${website}</a></p>
          ${
            profilePicURL
              ? `<img src="${profilePicURL}" class="profile-picture" alt="Profile Picture">`
              : ""
          }
        `;
      }

      // Enable download and share links
      const resumeContent: string = `
        Name: ${name}\n
        Email: ${email}\n
        Phone: ${phone}\n
        Education: ${education}\n
        Experience: ${experience}\n
        Skills: ${skills}\n
        Website/Portfolio: ${website}
      `;
      enableDownload(resumeContent);
      enableShareLink(resumeContent);
    }

    // Enable the download of the resume as a text file
    function enableDownload(resumeContent: string) {
      const blob = new Blob([resumeContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      if (downloadButton) {
        downloadButton.style.display = "block";
        downloadButton.href = url;
        downloadButton.download = "resume.txt";
      }
    }

    // Enable share link (using a blob URL)
    function enableShareLink(resumeContent: string) {
      const blob = new Blob([resumeContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      if (shareLink) {
        shareLink.style.display = "block";
        shareLink.href = url;
      }
    }
  });
});
