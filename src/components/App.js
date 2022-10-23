
import '../index.css';
import Header from '../components/Header.js'
import Main from "../components/Main.js"
import Footer from '../components/Footer.js'
import AddNewElementPopup from './AddNewElementPopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import DeleteConfirmPopup from './DeleteConfirmPopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React, { useCallback, useEffect, useState } from "react";
import api from "../utils/api";
import auth from "../utils/auth";
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteConfirmPopup, setIsDeleteConfirmPopup] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isResponseFail, setIsResponseFail] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })
  const [deletedCard, setDeletedCard] = useState({ id: '' })
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);

  const authorization = useCallback((jwt) => {
    return auth.checkToken(jwt).then((res) => {
      if (res) {
        setLoggedIn(true);
        setEmail(res.data.email)
      }
    }).catch((err) => showInfoTooltip(true, err));
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      authorization(jwt);
    }
  }, [authorization]);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn, history]);

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setEmail(null);
    setLoggedIn(false);
  }

  const onRegister = useCallback(({ email, password }) => {
    return auth.registration({ email, password }).then((res) => {
      return res;
    })
  }, [])

  const onLogin = ({ email, password }) => {

    return auth.authorization({ email, password }).then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setEmail(email);
      }

    })
  }

  const showInfoTooltip = (isError, err = null) => {
    if (err) console.log(err);
    setIsResponseFail(isError);
    setIsInfoTooltipOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);

  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddNewElementClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleDeleteCardClick(card) {
    setDeletedCard(card);
    setIsDeleteConfirmPopup(!isDeleteConfirmPopup);
  }
  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard)
  }
  const getCards = async () => {
    try {
      const cards = await api.getInitialCards();
      setCards(cards);
    } catch (e) {
      console.error(e);
    }
  }

  const handleCardLike = async (card) => {
    try {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    } catch (e) {
      console.error(e);
    }

  }

  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id);
      const newCard = cards.filter((item) => item._id !== card._id);
      setCards(newCard);
      closeAllPopups();
    } catch (e) {
      console.error(e);
    }

  }
  const handleCurrentUser = async () => {
    try {
      const userData = await api.getUserInfo();
      setCurrentUser(userData);
    } catch (e) {
      console.error(e);
    }
  }
  const handleUpdateUser = async (data) => {
    setIsLoading(true);
    try {
      const userData = await api.setUserInfo(data);
      setCurrentUser(userData);
      closeAllPopups();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }

  }

  const handleAddPlaceSubmit = async (data) => {
    setIsLoading(true);
    try {
      const newCard = await api.createCard(data);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }

  }

  const handleUpdateAvatar = async (avatarLink) => {
    setIsLoading(true);
    try {
      const userData = await api.editAvatar(avatarLink);
      setCurrentUser(userData);
      closeAllPopups();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }

  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteConfirmPopup(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ name: '', link: '' });
    setDeletedCard({ id: '' });
  }

  useEffect(() => {
    handleCurrentUser();
  }, []);

  useEffect(() => {
    getCards();

  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page" >
        <Header
          userEmail={email}
          loggedIn={loggedIn}
          onSignOut={handleSignOut}
        />
        <Switch>
          <Route path="/signin">
            <div className="loginContainer">
              <Login onLogin={onLogin} showInfoTooltip={showInfoTooltip} />
            </div>
          </Route>
          <Route path="/signup">
            <div className="registerContainer">
              <Register onRegister={onRegister} showInfoTooltip={showInfoTooltip} />
            </div>
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatarClick={handleEditAvatarClick}
            onEditProfileClick={handleEditProfileClick}
            onAddNewElementClick={handleAddNewElementClick}
            onCardDeleteClick={handleDeleteCardClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
          />

          <Route>
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Redirect to="/signin" />
            )}
          </Route>
        </Switch>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddNewElementPopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <DeleteConfirmPopup
          card={deletedCard}
          isOpen={isDeleteConfirmPopup}
          onClose={closeAllPopups}
          onDeleteConfirm={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isResponseFail={isResponseFail}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
