import React from "react";
import { useNavigate, BroweserRouter, Route, Routes } from 'react-router-dom';

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
import { InfoTooltip } from "./InfoTooltip";



export function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isZoomPopupOpen, setIsZoomPopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  const [email, setEmail] = React.useState('email@yandex.ru');
  const [password, setPassword] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isNotAvailable, setIsNotAvailable] = React.useState(false);
  const [confirmedDelete, setConfirmedDelete] = React.useState(null);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = React.useState(false);

  const isAnyPopupOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen 
  || isAddPlacePopupOpen || infoTooltipOpen || selectedCard

  const handleEditAvatarClick = () => {
    setIsNotAvailable(false);
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsNotAvailable(false);
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsNotAvailable(false);
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
    setIsNotAvailable(false);
    setIsPopupDeleteOpen(true);
    setConfirmedDelete(card);
  }
  
  const handleConfirmDeleteCard = () => {
    setIsNotAvailable(true);
    api.deleteCard(confirmedDelete._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c !== confirmedDelete))
      })
      .catch((err) => {
        console.log(err);
        setIsNotAvailable(false);
      });
  }
    

  function handleUpdateUser(userData) {
    setIsNotAvailable(true);
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
        setIsNotAvailable(false);
      });
  }

  function handleUpdateAvatar(avatarData) {
    setIsNotAvailable(true);
    setIsLoading(true);
    api.patchAvatar(avatarData)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        setIsNotAvailable(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
      
  }

  function handleAddPlaceSubmit(cardInfo) {
    setIsNotAvailable(true);
    setIsLoading(true);
    api.postNewCard(cardInfo)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        setIsNotAvailable(false);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsZoomPopupOpen(false);
    setInfoTooltipOpen(false);
    //setSelectedCard(null);
    setConfirmedDelete(null);

  }

  //=================
  const navigate = useNavigate();

  const handleLogin = ({password, email}) => {
    setIsNotAvailable(true);

    auth.authorizer({password, email})
      .then((res) => {
          localStorage.setItem('token', res.token);
          setEmail(email);
          setPassword(password);
          navigate('/', {replace: true});
      })
      .catch((err) => {
        console.log(`we've got a problem: ${err}`);
        setInfoTooltipOpen(true);
        setIsError(true);
      })
      .finally(() => {
        setIsNotAvailable(false);
      })
  }

  const handleRegister = (password, email) => {
    setIsNotAvailable(true);

    auth.register({password, email})
      .then(() => {
        setInfoTooltipOpen(true);
        setIsError(false);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(`we've got a problem: ${err}`);
        setInfoTooltipOpen(true);
        setIsError(true);
      })
      .finally(() => {
        setIsNotAvailable(false);
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
    navigate('/sign-in', { replace: true });
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    const currentToken = localStorage.getItem('token');
    if (currentToken) {
      auth.tokenCheck(currentToken)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", {replace: true});
        })
        .catch((err) => {
          console.log(`we've got a problem: ${err}`);
          setInfoTooltipOpen(true);
          setIsError(true);
        })
    } 
  }, [])

  React.useEffect(() => {
    function closeByEsc(e) {
      if(e.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isAnyPopupOpen) {
      document.addEventListener('keyup', closeByEsc);
      return () => {
        document.removeEventListener('keyup', closeByEsc)
      }
    }
  }, [isAnyPopupOpen])

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
          console.log(err);
      });
    }
   
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api.getDefoltElements()
        .then((res) => {
            setCards(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }
  }, [loggedIn]);

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
      
        
        <Header email={email} handleLogout={handleLogout}/>
          
        <Routes>

          <Route path="/" element={
            <>
              <ProtectedRoute element={Main}
                loggedIn={loggedIn}   
                cards={cards} 
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick} 
                onCardClick={handleCardClick} 
                onCardLike={handleCardLike} 
                onCardDelete={handleDeleteClick}
                //onClose={closeAllPopups}

              />
            </>
          }/>

          <Route path="/sign-in" element={<Login handleLogin={handleLogin} isNotAvailable={isNotAvailable} />} />
            
          <Route path ="/sign-up" element={<Register handleRegister={handleRegister} isNotAvailable={isNotAvailable} />} />
          
        </Routes>
        <Footer />
        <InfoTooltip
          isOpen = {infoTooltipOpen}
          onClose = {closeAllPopups}
          isError = {isError}
          handleOverlayClick={handleOverlayClick}
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

        {/* <DeletePlacePopup
          isOpen={}
          onClose={}
          onConfirmDeleteCard={}
          handleOverlayClick={handleOverlayClick}
          isNotAvailable={isNotAvailable}
        /> */}

      
      </CurrentUserContext.Provider> 
    </div> 
  );
}