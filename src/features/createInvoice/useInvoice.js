import { useEffect } from "react";
import {
  SPREADSHEET_ID,
  RANGES,
  INVOICE_TEMPLATE_ID,
  FOLDER_ID,
} from "../../helpers/constants.js";
import { useNavigate } from "react-router-dom";
import {
  batchUpdate,
  copySheet,
  createSpreadsheet,
  downloadSheet,
  updateInvoiceNumber,
  deleteSheet,
  changeSheetName,
  moveSheet,
  getValue,
  addRowToEnd,
} from "./sheetsFunctions.js";
import { createSheetPayload, numberToWords  } from "../../helpers/helper.js";

const useInvoice = () => {
  const navigate = useNavigate();
  let newSpreadsheetId;

  useEffect(() => {
    if (!window.gapi.client) {
      navigate("/");
    }
  });

  const createInvoice = async (payload) => {
    let totalAmount = 0;
    payload.products.map((product) => {
      totalAmount += Number(product.quantity) * Number(product.price);
    });

    const gstAmount = (totalAmount * 0.09).toFixed(2);
    const totalAmountWithGst = totalAmount + gstAmount * 2;
    const roundedTotalAmountWithGst = Math.round(totalAmountWithGst).toFixed(2);
    const roundOff = (roundedTotalAmountWithGst - totalAmountWithGst).toFixed(
      2
    );
    const totalAmountInWords = numberToWords(roundedTotalAmountWithGst, {
      currency: true,
    });
    payload = {
      ...payload,
      totalAmount: totalAmount.toFixed(2),
      gstAmount: gstAmount,
      totalAmountWithGst: totalAmountWithGst.toFixed(2),
      roundedTotalAmountWithGst: roundedTotalAmountWithGst,
      roundOff: roundOff,
      totalAmountInWords: totalAmountInWords,
    };

    const copyResponse = createCopyInvoiceTemplate(payload);
  };

  const fetchCustomers = async (updateValues) => {
    try {
      let values = await getValue(SPREADSHEET_ID, RANGES.CUSTOMERS);
      const customersList = values.map((customer) => {
        return {
          id: customer[0],
          name: customer[1],
          address: customer[2],
          gstNumber: customer[3],
          state: customer[4],
        };
      });
      updateValues(customersList);
    } catch (error) {
      // Handle the error appropriately
      console.error("Error fetching customers:", error);
    }
  };

  const fetchProducts = async (updateValues) => {
    try {
      let values = await getValue(SPREADSHEET_ID, RANGES.PRODUCTS);
      const productsList = values.map((product) => {
        return {
          label: product[0],
        };
      });
      updateValues(productsList);
    } catch (error) {
      // Handle the error appropriately
      console.error("Error fetching products:", error);
    }
  };

  const fetchInvoices = async (updateValues) => {
    try {
      let values = await getValue(SPREADSHEET_ID, RANGES.INVOICE_LIST);
      const invoiceList = values.map((invoice, index) => {
        return {
          id: index,
          invoiceNumber: invoice[0],
          customerName: invoice[1],
          invoiceDate: invoice[2],
          totalAmount: invoice[3],
        };
      });
      updateValues(invoiceList);
    } catch (error) {
      // Handle the error appropriately
      console.error("Error fetching invoice list:", error);
    }
  };

  const fetchInvoiceNumber = async (updateValues) => {
    try {
      let values = await getValue(
        SPREADSHEET_ID,
        RANGES.CURRENT_INVOICE_NUMBER
      );
      const invoiceNumber = Number(values[0][0]);
      updateValues(invoiceNumber + 1);
    } catch (error) {
      // Handle the error appropriately
      console.error("Error fetching invoice number:", error);
    }
  };

  const createCopyInvoiceTemplate = async (payload) => {
    const createResponse = await createSpreadsheet(
      `${payload.customerName}_${payload.invoiceNumber}`
    );
    newSpreadsheetId = createResponse.result.spreadsheetId;
    const copiedSheetResponse = await copySheet(
      newSpreadsheetId,
      SPREADSHEET_ID,
      INVOICE_TEMPLATE_ID
    );
    deleteSheet(newSpreadsheetId, 0);
    changeSheetName(
      newSpreadsheetId,
      copiedSheetResponse.result.sheetId,
      "Invoice"
    );
    moveSheet(newSpreadsheetId, FOLDER_ID);
    const data = createSheetPayload(
      payload,
      copiedSheetResponse.result.sheetId
    );
    const updateResponse = await batchUpdate(newSpreadsheetId, data);
    downloadSheet(newSpreadsheetId, copiedSheetResponse.result.sheetId);
    updateInvoiceNumber(SPREADSHEET_ID, String(payload.invoiceNumber));
    const payloadVal = [
      [
        "",
        payload.invoiceNumber,
        payload.customerName,
        payload.invoiceDate,
        "55",
      ],
    ];
    const values = addRowToEnd(SPREADSHEET_ID, RANGES.INVOICE_LIST, payloadVal);
    return createResponse;
  };

  return {
    fetchCustomers,
    fetchProducts,
    fetchInvoiceNumber,
    fetchInvoices,
    createInvoice,
  };
};

export default useInvoice;
