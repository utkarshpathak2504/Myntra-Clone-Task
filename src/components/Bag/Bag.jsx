import { Box, Grid, makeStyles } from "@material-ui/core";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getItemsFromCart } from "../../apis/productService";

import {
  CartHeader,
  Footer,
  BagTile,
  AddressTile,
  OrderTile,
  AddressForm,
  ShopNow,
} from "../../components";
import { useLogin, useProduct } from "../../context";
import { ActionButton, DialogBox, SnackbarView } from "../Common";
import { EmptyBag } from "../../images";
const useStyles = makeStyles(theme => ({
  root: {
    //  marginTop: "15px"
  },
  container: {
    width: "70%",
    margin: "0 auto",
    padding: "0px 15px",
    minHeight: "75vh",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  first: {
    padding: "30px 20px 10px 0px",
    borderRight: "1px solid #d4d5d9",
  },
  second: {
    padding: "30px 15px",
  },
}));

export const Bag = () => {
  const classes = useStyles();
  const history = useHistory();

  const { userState, userDispatch } = useLogin();
  const { productsState, productsDispatch } = useProduct();
  const [open, setOpen] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [message, setMessage] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  useEffect(
    () => {
      getItemsFromCart().then(res =>
        productsDispatch({
          type: "SET_CART_ITEMS",
          payload: res.data?.data?.products,
        })
      );
    },
    // eslint-disable-next-line
    []
  );
  
  return (
    <div className={classes.root}>
      <CartHeader />
      {message && message?.type && <SnackbarView message={message} />}

      <Grid style={{ minHeight: "70vh" }}>
        {productsState?.cartItems?.length > 0 ? (
          <>
            <Grid container className={classes.container}>
              <Grid
                item
                xs={12}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                className={classes.first}
              >
               
                <div style={{ marginTop: "10px" }}>
                  {productsState?.cartItems?.map((cartItem, id) => (
                    <BagTile details={cartItem} key={id} />
                  ))}
                </div>
              </Grid>

              {productsState?.cartItems?.length > 0 && (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={4}
                  className={classes.second}
                >
                  <OrderTile />

                  <ActionButton
                    kind="SIMPLE_PRIMARY"
                    label="Place Order"
                   
                  />
                </Grid>
              )}
            </Grid>
          </>
        ) : (
          <Grid
            style={{
              marginTop: "20px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div>
                <img src={EmptyBag} alt="empty_bag" />
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#ff3f6ccc",
                }}
              >
                It feels so light...
              </div>
            </div>
            <ShopNow />
          </Grid>
        )}
      </Grid>
      <Footer />

  
      
     
      
    </div>
  );
};
