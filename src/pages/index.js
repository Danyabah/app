import "../pages/index.css";

import {
  btnAddCard,
  btnOpenAvatar,
  btnProfileEdit,
  formProfile,
  newElementForm,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm";

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
  likesCount: ".card__likes-count",
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
      return createCard(card);
    },
  },
  ".card__items"
);

const popupFormProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile-info",
  handleFormSubmit: (formData) => {
    popupFormProfile.showLoading(true);
    api
      .setProfile(formData)
      .then((response) => {
        userInfo.setUserInfo(response);
        popupFormProfile.close();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        popupFormProfile.showLoading(false);
      });
  },
});

const popupFormNewCard = new PopupWithForm({
  popupSelector: ".popup_type_add-card",
  handleFormSubmit: (formData) => {
    popupFormNewCard.showLoading(true);
    api
      .addNewCard(formData)
      .then((response) => {
        cardSection.addItem(response);
        popupFormNewCard.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupFormNewCard.showLoading(false);
      });
    // const card = { name: formData.cardName, link: formData.cardLink };
    // cardSection.addItem(createCard(card));
    // popupFormNewCard.close();
  },
});

const popupWithConfirm = new PopupWithConfirm({
  popupSelector: ".popup_type_del-confirm",
  deleteApi: () => {
    const { data, deleteCard } = popupWithConfirm.getData();
    api
      .deleteCard(data._id)
      .then(() => {
        deleteCard();
        popupWithConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

popupWithConfirm.setEventListeners();

const popupWithAvatar = new PopupWithForm({
  popupSelector: ".popup__avatar",
  handleFormSubmit: (formData) => {
    popupWithAvatar.showLoading(true);
    api
      .setAvatar(formData)
      .then((response) => {
        userInfo.setUserInfo(response);
        popupWithAvatar.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupWithAvatar.showLoading(false);
      });
  },
});

popupWithAvatar.setEventListeners();

function createCard(card) {
  const plusNewCard = new Card(
    card,
    cardParams,
    "#card-template",
    handleCardClick,
    handleDeleteCard,
    getUserId,
    (id) => {
      api
        .likeCard(id)
        .then((res) => {
          plusNewCard.countLikes(res);
          plusNewCard.toggleLike(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    (id) => {
      api
        .dislikeCard(id)
        .then((res) => {
          plusNewCard.countLikes(res);
          plusNewCard.toggleLike(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  );
  return plusNewCard.createCard();
}

function getUserId() {
  return userInfo.getUserId();
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}
function handleDeleteCard(data, deleteCard) {
  popupWithConfirm.open();
  popupWithConfirm.setData(data, deleteCard);
}

btnProfileEdit.addEventListener("click", () => {
  popupFormProfile.setInputValues(userInfo.getUserInfo());
  popupFormProfile.open();
});

btnOpenAvatar.addEventListener("click", () => {
  popupWithAvatar.open();
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
