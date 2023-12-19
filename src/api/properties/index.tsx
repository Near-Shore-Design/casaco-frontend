import instance from "apiInstance";
import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

interface MyResponseType {
  results: any[]; // Replace 'any' with the actual type of 'results'
}

interface FilterPropertiesPayload {
  baths?: number | null;
  beds?: number | null;
  price_gt?: number;
  price_lt?: number;
  search?: string;
  location__in?: any;
  feature__contains?: string;
  interior_size__gt?: number;
  interior_size__lt?: number;
  exterior_size__gt?: number;
  exterior_size__lt?: number;
  types__in?: string;
}

export const getProperties = async () => {
  try {
    const response: AxiosResponse<MyResponseType> = await instance({
      method: "get",
      url: "properties/?property_status=for_sale",
    });
    return response.data.results;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const getPropertiesByID = async (property_id: number) => {
  try {
    const response = await instance({
      method: "get",
      url: `properties/${property_id}/`,
    });
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const getHomeProperties = async (user_id: number) => {
  try {
    const response = await instance({
      method: "get",
      url: `properties/?user_id=${user_id}`,
    });
    return response.data.results;
  } catch (error: any) {
    toast.error(error.message);
  }
};
export const getFilterProperties = async (payload: FilterPropertiesPayload) => {
  const {
    baths,
    beds,
    price_gt,
    price_lt,
    search,
    location__in,
    feature__contains,
    interior_size__gt,
    interior_size__lt,
    exterior_size__gt,
    exterior_size__lt,
    types__in,
  } = payload;
  try {
    const params: Record<string, any> = {
      property: true,
    };

    if (baths !== undefined) {
      params.baths = baths;
    }
    if (beds !== undefined) {
      params.beds = beds;
    }
    if (price_gt !== undefined) {
      params.price__gt = price_gt;
    }
    if (price_lt !== undefined) {
      params.price__lt = price_lt;
    }
    if (search !== undefined) {
      params.search = search;
    }
    if (location__in !== undefined) {
      params.location__in = location__in;
    }
    if (feature__contains !== undefined) {
      params.feature__contains = feature__contains;
    }
    if (interior_size__gt !== undefined) {
      params.interior_size__gt = interior_size__gt;
    }
    if (interior_size__lt !== undefined) {
      params.interior_size__lt = interior_size__lt;
    }
    if (exterior_size__lt !== undefined) {
      params.exterior_size__lt = exterior_size__lt;
    }
    if (exterior_size__gt !== undefined) {
      params.exterior_size__gt = exterior_size__gt;
    }
    if (types__in !== undefined) {
      params.types__in = types__in;
    }
    const response = await instance.get("properties?property_status=for_sale", {
      params,
    });
    return response.data.results;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const getFavoriteProperties = async (user_id: number) => {
  try {
    const response = await instance({
      method: "get",
      url: `favourites/user/${user_id}/`,
    });
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const addAndRemoveFavoriteProperty = async (data: {
  user_id: number;
  property_id: number;
}) => {
  try {
    const response: AxiosResponse<MyResponseType> = await instance({
      method: "post",
      url: "favourites/update",
      data: data,
    });
    return response.data.results;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const tourRequest = async (data: {
  user_id: number;
  property_id?: number;
  scheduled_date: string;
  scheduled_time: any;
  message: string;
}) => {
  try {
    const response: AxiosResponse<MyResponseType> = await instance({
      method: "post",
      url: "tours/request-tour",
      data: data,
    });
    toast.success("Tour request scheduled!");
    return response.data.results;
  } catch (error: any) {
    toast.error("Add a message!");
  }
};
export const tourBookedCheck = async (property_id?: number) => {
  try {
    const response: AxiosResponse<any> = await instance({
      method: "get",
      url: `tours/request-tour?property_id=${property_id}`,
    });

    return response.data.message;
  } catch (error: any) {
    toast.error(error.message);
  }
};
export const listProperty = async (data: any) => {
  try {
    const response: AxiosResponse<MyResponseType> = await instance({
      method: "post",
      url: "properties/",
      data: data,
    });
    if (response) {
      toast.success("Property sucessfully listed!");
    }
    return response.data.results;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const updatePropertyForSale = async ({
  data,
  id,
}: {
  data: any;
  id: number;
}) => {
  try {
    const response: AxiosResponse<MyResponseType> = await instance({
      method: "put",
      url: `properties/${id}/`,
      data: data,
    });
    if (response) {
      toast.success("Property sucessfully posted for sale!");
    }
    return response.data.results;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const sellProperty = async (data: any) => {
  try {
    const response: AxiosResponse<MyResponseType> = await instance({
      method: "post",
      url: `properties/`,
      data: data,
    });
    if (response) {
      toast.success("Property sucessfully posted for sale!");
    }
    return response.data.results;
  } catch (error: any) {
    toast.error(error.message);
  }
};
