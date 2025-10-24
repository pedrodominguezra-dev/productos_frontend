import apiClient from "@/api/apiProducts";
import type { AxiosError } from "axios";
import type { getProductsResponseT, GetProductsSuccess, ResponseI } from "./ProductServiceInterface";
import type { QueryStateI } from "@/types/Table";

export class ProductService {
  private static instance: ProductService | undefined = undefined;

  public static getInstance(): ProductService {
    ProductService.instance ??= new ProductService();
    return ProductService.instance;
  }

  public async getProducts(query : QueryStateI) : Promise<getProductsResponseT> {
    console.log(query);
    try {
        const { data } = await apiClient.get<GetProductsSuccess>('/products',{ params : query});

        return data;

    } catch (error) {
      const err = error as AxiosError;

      return {
        status: false,
        message: (
          err.response?.data as {
            message?: string;
          }
        ).message ?? 'Existe un error en la conexión',
        data : []
      }
    }
  }
}
