import React from "react";
import { Grid, _ } from "gridjs-react";

import "gridjs/dist/theme/mermaid.css";
import { translate } from "../lib/translate";
import type { Product } from "../types/Product";

export const GridProducts = React.memo(() => {
  const token = localStorage.getItem("token") || null;

  return (
    <Grid
      columns={[
        {
          id: "id",
          name: "ID",
          hidden: true,
        },
        {
          id: "name",
          name: "Nombre",
        },
        "Precio",
        {
          id: "description",
          name: "Descripción",
        },
      ]}
      search={{
        debounceTimeout: 1000,
        server: {
          url: (prev, keyword) => {
            return `${prev}&search=${keyword}`;
          },
        },
      }}
      pagination={{
        limit: 10,
        server: {
          url: (prev, page, limit) => {
            return `${prev}&limit=${limit}&offset=${page * limit}`;
          },
        },
      }}
      server={{
        url: `http://127.0.0.1:8000/api/products?`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        mode: "cors",
        then: (data) => {
          return data.products.map((product: Product) => {
            return [
              product.id,
              product.name,
              `$${product.price}`,
              product.description,
            ];
          });
        },
        total: (data) => data.total,
      }}
      className={{
        header: "flex justify-end",
        search: "mr-[100px]",
      }}
      language={translate}
      resizable={true}
    />
  );
});
