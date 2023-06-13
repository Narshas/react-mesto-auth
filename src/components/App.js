import React from "react";

import { ImagePopup } from "./ImagePopup";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { api } from "../utils/Api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";

import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "./Login";
import { Register } from "./Register";
import { auth } from "../utils/Auth";
import { infoTooltip } from "./InfoTooltip";

export function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isZoomPopupOpen, setIsZoomPopupOpen] = React.useState(false);
  const {isLoading, setIsLoading} = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false); //попробовать использовать и для тултипа
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  } 

  const handleCardClick = (element) => {
    setSelectedCard(element);
    setIsZoomPopupOpen(true);
  }

  function handleDeleteClick(card) {
    api.deleteCard(card)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card.id))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.patchUserInfo(userData)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatarData) {
    setIsLoading(true);
    api.patchAvatar(avatarData)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
      
  }

  function handleAddPlaceSubmit(cardInfo) {
    setIsLoading(true);
    api.postNewCard(cardInfo)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  //================================================

  const handleLogin = ({password, email}) => {
    auth.authorizer({password, email})
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setEmail(email);
          setPassword(password);
        }
      })
      .catch((err) => {
        console.log(`we've got a problem: ${err}`);
        setInfoTooltipOpen(true);
        setIsError(true);
      })
  }

  const handleRegister = () => {
    auth.register({password, email})
      .then(() => {
        setInfoTooltipOpen(true);
        setIsError(false);
      })
      .catch(() => {
        console.log(`we've got a problem: ${err}`);
        setInfoTooltipOpen(true);
        setIsError(true);
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false)
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsZoomPopupOpen(false);
  }
  
  React.useEffect(() => {

    api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

  React.useEffect(() => {

    api.getDefoltElements()
        .then((res) => {
            setCards(res);
        })
        .catch((err) => {
            console.log(err);
        });
  }, []);

  React.useEffect(() => {
    const currentToken = localStorage.getItem('jwt');
    if (currentToken) {
      auth.tokenCheck(currentToken)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push('/');
        })
        .catch((err) => {
          console.log(`we've got a problem: ${err}`)
        })
    } 
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header
          email={email}
          loggedIn={loggedIn}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<ProtectedRoute 
          loggedIn = { loggedIn }
          element = { Main }
          cards={cards} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick} 
          onCardLike={handleCardLike} 
          onCardDelete={handleDeleteClick} />}/>
          <Route path="/sign-up" >
            <>
              <Login 
                handleLogin = { handleLogin }
                isOpen = { infoTooltipOpen }
                onClose = { closeAllPopups }
              />
            </>
          </Route>
          <Route path ="/sign-in">
            <>
              <Register
                handleRegister={ handleRegister }
                isOpen = { infoTooltipOpen }
                onClose = { closeAllPopups }
              />
            </>
          </Route>
        </Routes>
        <Footer />
        <infoTooltip
          isOpen = {infoTooltipOpen}
          onClose = {closeAllPopups}
          isError = {isError}
        />

        <ImagePopup 
          cardData={selectedCard} 
          onClose={closeAllPopups} 
          isOpen={isZoomPopupOpen} />

        <EditAvatarPopup 
          isLoading={isLoading} 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}/>

        <EditProfilePopup 
          isLoading={isLoading} 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup 
          isLoading={isLoading} 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}/>

      </div>
    </CurrentUserContext.Provider>  
  );
}