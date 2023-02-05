import "../pages/index.css";

import {
  btnAddCard,
  btnProfileEdit,
  formProfile,
  newElementForm,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { cardsList } from "../utils/utils.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-58",
  headers: {
    authorization: "d7e9d7f4-bd5f-4a83-9744-cc8e47167bac",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([user, cards]) => {
    console.log(cards);
    userInfo.setUserInfo(user);
    cardSection.render(cards);
  })
  .catch((error) => {
    console.log(error);
  });

export const cardParams = {
  imgCardElement: ".card__image",
  titleCardText: ".card__title",
  likeBtn: ".card__button-likes",
  deleteBtn: ".card__button-delete",
  activeBtn: ".card__button-likes_active",
};

export const selectValidation = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inputErrorClass: "form__input_message_error",
  errorClass: "form__input-error_enable",
};

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__work",
  ".profile__avatar"
);
const popupWithImage = new PopupWithImage({
  popupSelector: ".popup_type_image-preview",
});

const cardSection = new Section(
  {
    renderer: (card) => {
     return createCard(card)
    },
  },
  ".card__items"
);

const popupFormProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile-info",
  handleFormSubmit: (formData) => {
    console.log(formData);
    api
      .setProfile(formData)
      .then((response) => {
        userInfo.setUserInfo(response);
        popupFormProfile.close();
      })
      .catch((error) => console.log(error));
  },
});

const popupFormNewCard = new PopupWithForm({
  popupSelector: ".popup_type_add-card",
  handleFormSubmit: (formData) => {
    api.addNewCard(formData).then((response) => {
      cardSection.addItem(response)
      popupFormNewCard.close
    }).catch((error)=>{
      console.log(error)
    })
    // const card = { name: formData.cardName, link: formData.cardLink };
    // cardSection.addItem(createCard(card));
    // popupFormNewCard.close();
  },
});

function createCard(card) {
  const plusNewCard = new Card(
    card,
    cardParams,
    "#card-template",
    handleCardClick
  );
  return plusNewCard.createCard();
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

btnProfileEdit.addEventListener("click", () => {
  popupFormProfile.setInputValues(userInfo.getUserInfo());
  popupFormProfile.open();
});

btnAddCard.addEventListener("click", () => {
  popupFormNewCard.open();
});

const profileFormValidator = new FormValidator(selectValidation, formProfile);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(selectValidation, newElementForm);
placeFormValidator.enableValidation();
//cardSection.render();

popupFormProfile.setEventListeners();
popupFormNewCard.setEventListeners();
popupWithImage.setEventListeners();
