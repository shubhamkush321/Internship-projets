document.addEventListener('DOMContentLoaded', () => {
  // Elements for dark mode toggle and body
  const darkModeToggle = document.getElementById('dark-mode-btn');
  const body = document.body;

// Elements for input and output text areas and character count
  const inputTextArea = document.getElementById('input-text');
  const outputTextArea = document.getElementById('output-text');
  const inputChars = document.getElementById('input-chars');

 // Element for language swap button
  const swapLanguagesButton = document.querySelector('.swap-position');

  // Dropdown containers for language selection
  const dropdowns = document.querySelectorAll(".dropdown-container");
  const inputLanguageDropdown = document.querySelector("#input-language");
  const outputLanguageDropdown = document.querySelector("#output-language");

  // Elements for file upload and download
  const uploadDocument = document.querySelector("#upload-document");
  const uploadTitle = document.querySelector("#upload-title");
  const downloadBtn = document.querySelector("#download-btn");

  //  dark mode based on checkbox state
  darkModeToggle.addEventListener('change', () => {
    body.classList.toggle('dark', darkModeToggle.checked);
  });

  // Update character count as user types in the input text area
  inputTextArea.addEventListener('input', () => {
    inputChars.textContent = inputTextArea.value.length;
  });

  // Function to populate language dropdowns with options
  function populateDropdown(dropdown, options) {
    const ul = dropdown.querySelector("ul");
    ul.innerHTML = ""; // Clear existing options
    options.forEach(option => {
      const li = document.createElement("li");
      li.textContent = `${option.name} (${option.native})`; 
      li.dataset.value = option.code; // value for language code
      li.classList.add("option");
      ul.appendChild(li);
    });
  }

// Populate the input and output language dropdowns with language options
  populateDropdown(inputLanguageDropdown, languages);
  populateDropdown(outputLanguageDropdown, languages);

  // Handle dropdown toggle and option selection
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    });

    dropdown.querySelectorAll(".option").forEach(item => {
      item.addEventListener("click", () => {
        dropdown.querySelectorAll(".option").forEach(item => item.classList.remove("active"));
        item.classList.add("active"); // Highlight selected option
        const selected = dropdown.querySelector(".selected");
        selected.textContent = item.textContent; 
        selected.dataset.value = item.dataset.value; 
        translate(); 
      });
    });
  });

 // Close dropdowns when clicking outside of them
  document.addEventListener("click", (e) => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  });

  //Swap languages and text between input and output areas
  swapLanguagesButton.addEventListener("click", () => {
    const inputLanguage = inputLanguageDropdown.querySelector(".selected");
    const outputLanguage = outputLanguageDropdown.querySelector(".selected");
    //Swap language names and values
    [inputLanguage.innerHTML, outputLanguage.innerHTML] = [outputLanguage.innerHTML, inputLanguage.innerHTML];
    [inputLanguage.dataset.value, outputLanguage.dataset.value] = [outputLanguage.dataset.value, inputLanguage.dataset.value];
    //Swap text between input and output text areas
    [inputTextArea.value, outputTextArea.value] = [outputTextArea.value, inputTextArea.value];
    translate(); // Translate text after swapping languages
  });

 // Function to handle text translation
  function translate() {
    const inputText = inputTextArea.value;
    const inputLang = inputLanguageDropdown.querySelector(".selected").dataset.value;
    const outputLang = outputLanguageDropdown.querySelector(".selected").dataset.value;
    if (!inputText) return; // Do nothing if input text is empty

    // Construct the translation API URL
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLang}&tl=${outputLang}&dt=t&q=${encodeURIComponent(inputText)}`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
      // Update output text area with translated text
        outputTextArea.value = json[0].map(item => item[0]).join("");
      })
      .catch(error => console.error(error)); // Handle errors
  }

 // Limit input to 5000 characters and trigger translation
  inputTextArea.addEventListener("input", () => {
    if (inputTextArea.value.length > 5000) {
      inputTextArea.value = inputTextArea.value.slice(0, 5000); // Limit text length
    }
    translate(); // Translate text as user types
  });

  // Handle document upload and read file content
  uploadDocument.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const validTypes = ["application/pdf", "text/plain", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (validTypes.includes(file.type)) {
      uploadTitle.textContent = file.name; 
      const reader = new FileReader();
      reader.readAsText(file); 
      reader.onload = (e) => {
        inputTextArea.value = e.target.result; 
        translate(); 
      };
    } else {
      alert("Please upload a valid file"); 
    }
  });

  // Download translated text as a file
  downloadBtn.addEventListener("click", () => {
    const outputText = outputTextArea.value;
    const outputLang = outputLanguageDropdown.querySelector(".selected").dataset.value;
    if (outputText) {
      const blob = new Blob([outputText], { type: "text/plain" }); // Create a blob with translated text
      const url = URL.createObjectURL(blob); // Create a URL for the blob
      const a = document.createElement("a");
      a.download = `translated-to-${outputLang}.txt`; // Set download file name
      a.href = url; // Set href to blob URL
      a.click(); // Trigger download
    }
  });
});
