/*
 *
 * HomePage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

import {Layout, BaseHeaderLayout, ContentLayout, Button, Loader, Alert} from "@strapi/design-system";
import axios from "axios";

const HomePage = () => {

  const [message, setMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [intr, setIntr] = React.useState(null);

  React.useEffect(() => {
    if (message !== null) {
      setIntr(setInterval(() => {
        getMessage();
      }, 3000))
    } else {
      clearInterval(intr)
    }

  }, [message])

  const getMessage = () => {
    axios.get(`${strapi.backendURL}/optika-import/import-status`)
      .then((res) => res.data)
      .then((data) => setMessage(data.message))
  }

  const buttonHandler = async () => {

    setLoading(true);
    await axios.post(`${strapi.backendURL}/optika-import/sync`, {data: {}})
      .then(res => res.data)
      .then(data => {
        setLoading(false)
        if (data.hasOwnProperty('message')) {
          setMessage(data.message);
        }
      })
      .catch(e => {
        setLoading(false);
        console.error(e)
      })
  }

  const deleteHandler = async () => {
    setLoading(true)
    axios.post(`${strapi.backendURL}/optika-import/delete`, {data: {}})
      .then(res => res.data)
      .then(data => {
        setLoading(false)
        console.log(data)
      })
      .catch(e => {
        setLoading(false)
        console.error(e)
      })
  }

  return (
    <Layout>
      <BaseHeaderLayout title={"Optika Import Page"}/>
      <ContentLayout>
        <div style={{color: '#fff', marginBottom: '2rem'}}>
          <h1 style={{marginBottom: '2rem'}}>By push the button, lets start the Import!</h1>
          <Button style={{float: 'left', marginRight: '2rem'}} type={"button"} onClick={buttonHandler}>Import CSV
            Data</Button>
          <Button type={"button"} onClick={deleteHandler}>Delete all Products</Button>
        </div>
        {loading && <Loader/>}
        {message && <Alert closeLabel="Close alert">{message}</Alert>}
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
