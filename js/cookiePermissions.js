const storageType = sessionStorage;
const consentPropertyName = "storymap_consent";


const showPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () => {

  const consentPopup = document.getElementById('consent-popup');
  const acceptBtn = document.getElementById('accept');
  const acceptFnct = event => {
    saveToStorage(storageType);
      consentPopup.style.opacity = "0";
      consentPopup.style.display = "none";
  }

  acceptBtn.addEventListener('click', acceptFnct);

  if (showPopup()) {
    setTimeout (() =>  {

      consentPopup.style.opacity = ".9";
    }, 2000);
  }
};
