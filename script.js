document.addEventListener("DOMContentLoaded", function () {
    var resumeForm = document.getElementById("resumeForm");
    var resumeOutput = document.getElementById("resumeOutput");
    var skillsSection = document.getElementById("skillsSection");
    var toggleButton = document.getElementById("toggleSkills");
    var downloadButton = document.getElementById("downloadResume");
    var shareLink = document.getElementById("shareResume");
    var profilePictureURL = "";
    // Toggle skills section visibility
    if (toggleButton && skillsSection) {
        var isSkillsVisible_1 = true;
        toggleButton.addEventListener("click", function () {
            isSkillsVisible_1 = !isSkillsVisible_1;
            if (skillsSection) {
                skillsSection.style.display = isSkillsVisible_1 ? "block" : "none";
            }
            toggleButton.textContent = isSkillsVisible_1
                ? "Hide Skills Section"
                : "Show Skills Section";
        });
    }
    // Form submission and resume generation
    resumeForm === null || resumeForm === void 0 ? void 0 : resumeForm.addEventListener("submit", function (event) {
        var _a, _b, _c, _d, _e, _f, _g;
        event.preventDefault();
        var name = (_a = document.getElementById("name")) === null || _a === void 0 ? void 0 : _a.value;
        var email = (_b = document.getElementById("email")) === null || _b === void 0 ? void 0 : _b.value;
        var phone = (_c = document.getElementById("phone")) === null || _c === void 0 ? void 0 : _c.value;
        var education = (_d = document.getElementById("education")) === null || _d === void 0 ? void 0 : _d.value;
        var experience = (_e = document.getElementById("experience")) === null || _e === void 0 ? void 0 : _e.value;
        var skills = (_f = document.getElementById("skills")) === null || _f === void 0 ? void 0 : _f.value;
        var website = (_g = document.getElementById("website")) === null || _g === void 0 ? void 0 : _g.value;
        var profilePictureInput = document.getElementById("profile-picture");
        if ((profilePictureInput === null || profilePictureInput === void 0 ? void 0 : profilePictureInput.files) && profilePictureInput.files.length > 0) {
            var reader = new FileReader();
            // Use onload event handler to load the file
            reader.onload = function (e) {
                var _a;
                if ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) {
                    profilePictureURL = e.target.result;
                    generateResume(profilePictureURL);
                }
            };
            reader.readAsDataURL(profilePictureInput.files[0]);
        }
        else {
            generateResume(profilePictureURL); // Continue without profile picture if not selected
        }
        function generateResume(profilePicURL) {
            if (resumeOutput) {
                resumeOutput.innerHTML = "\n          <h2>Generated Resume</h2>\n          <p><strong>Name:</strong> ".concat(name, "</p>\n          <p><strong>Email:</strong> ").concat(email, "</p>\n          <p><strong>Phone:</strong> ").concat(phone, "</p>\n          <p><strong>Education:</strong> ").concat(education, "</p>\n          <p><strong>Experience:</strong> ").concat(experience, "</p>\n          <p><strong>Skills:</strong> ").concat(skills, "</p>\n          <p><strong>Website/Portfolio:</strong> <a href=\"").concat(website, "\" target=\"_blank\">").concat(website, "</a></p>\n          ").concat(profilePicURL
                    ? "<img src=\"".concat(profilePicURL, "\" class=\"profile-picture\" alt=\"Profile Picture\">")
                    : "", "\n        ");
            }
            // Enable download and share links
            var resumeContent = "\n        Name: ".concat(name, "\n\n        Email: ").concat(email, "\n\n        Phone: ").concat(phone, "\n\n        Education: ").concat(education, "\n\n        Experience: ").concat(experience, "\n\n        Skills: ").concat(skills, "\n\n        Website/Portfolio: ").concat(website, "\n      ");
            enableDownload(resumeContent);
            enableShareLink(resumeContent);
        }
        // Enable the download of the resume as a text file
        function enableDownload(resumeContent) {
            var blob = new Blob([resumeContent], { type: "text/plain" });
            var url = URL.createObjectURL(blob);
            if (downloadButton) {
                downloadButton.style.display = "block";
                downloadButton.href = url;
                downloadButton.download = "resume.txt";
            }
        }
        // Enable share link (using a blob URL)
        function enableShareLink(resumeContent) {
            var blob = new Blob([resumeContent], { type: "text/plain" });
            var url = URL.createObjectURL(blob);
            if (shareLink) {
                shareLink.style.display = "block";
                shareLink.href = url;
            }
        }
    });
});
