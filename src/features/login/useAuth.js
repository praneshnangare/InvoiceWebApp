import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_KEY, CLIENT_ID } from "../../helpers/constants";

const useAuth = (setIsLoggedIn) => {
  const user = {};
  const navigate = useNavigate();

  const login = async (setIsLoggedIn, setIsLoading) => {
    await window.gapi.load("client", async () => {
      try {
        setIsLoading(true);
        await window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
            "https://sheets.googleapis.com/$discovery/rest?version=v4",
          ],
          scope:
            "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets",
          plugin_name: "invoicee",
        });
        // Load the Drive and Sheets API client libraries
        await window.gapi.client.load("drive", "v3");
        await window.gapi.client.load("sheets", "v4");

        const isLoggedIn = await window.gapi.auth2
          .getAuthInstance()
          .isSignedIn.get();
        if (!isLoggedIn) {
          const response = await window.gapi.auth2.getAuthInstance().signIn();
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(true);
        }
        setIsLoading(false);
        navigate("/create-invoice");
      } catch (error) {
        setIsLoading(false);
        setIsLoggedIn(false);
        console.error("Error updating Google Sheet:", error);
      }
    });
  };

  const logout = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log("User signed out.");
      navigate("/");
    });
  };

  return {
    login,
    logout,
    user,
  };
};

export default useAuth;
