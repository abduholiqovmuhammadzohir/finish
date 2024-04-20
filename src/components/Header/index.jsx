import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from "./index.module.css";
import { useNavigate, useParams } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  right: '0',
  transform: 'translate(0, -50%)',
  width: 500,
  height: "100vh",
  bgcolor: 'rgba(81, 81, 81, 1)',
  boxShadow: 24,
};

function Header() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then(res => res.json())
      .then((el) => {
        setData(el);
        console.log(el);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  const handleRemove = (itemId) => {
    const updatedLists = lists.filter(item => item.id !== itemId);
    setLists(updatedLists);
    localStorage.setItem('data', JSON.stringify(updatedLists));
  };
  
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem('data')) || []
  );

  useEffect(() => {
    const updatedLists = JSON.parse(localStorage.getItem('data')) || [];
    setLists(updatedLists);
  }, [open]);





  return (
    <div className={styles.header_wraper}>
      <div className={styles.header}>
        <h1 onClick={handleClick}>CRYPTOFOLIO</h1>
        <div className={styles.list}>
          <select>
            <option value="usd">USD</option>
            <option value="usd">RUB</option>
            <option value="usd">EUR</option>
          </select>
          <button onClick={handleOpen}>WATCH LIST</button>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <h2 className={styles.h2}>WATCHLIST</h2>
                </Typography>
                <div className={styles.modal_card}>
                  {lists && lists.length > 0 &&
                    lists.map(item => (
                      <div className={styles.card} key={item.id}>
                        <img src={item.image} alt="" />
                        <h3>₹ {item.current_price}</h3>
                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                      </div>
                    ))}
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
