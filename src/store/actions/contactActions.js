import { createAsyncThunk } from "@reduxjs/toolkit";
import SQLite from 'react-native-sqlite-storage';

 const db = SQLite.openDatabase({
    name: 'ContactsDataBase',
    location: 'default',
  });

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contact_id) => {
    return new Promise((resolve, reject) => {
      db.transaction(txn => {
        txn.executeSql(
          `DELETE FROM users WHERE id = ?`,
          [contact_id],
          (sqlTxn, res) => {
            console.log('Kişi silindi:', contact_id);
            // Ekstra: Yeniden veri çek
            //dispatch(getContacts()); // varsa async thunk'ını çağır
            resolve();
          },
          error => {
            console.log('Silme hatası:', error.message);
            reject(error);
          }
        );
      });
    });
  }
);


