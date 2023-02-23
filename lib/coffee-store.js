import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});


const getUrlForCoffeeStores=(latLong,query,limit)=>{
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}
const getListOfCoffeeStoresPhotos=async ()=>{
    const photos = await unsplashApi.search.getPhotos({
        query: "coffee shop",
        perPage: 30,
    });
    const UnspalshPhotos=photos.response.results;
    return UnspalshPhotos.map((result)=>result.urls['small'])
}

export const fetchCoffeeStores =async ()=>{
   const photos=await getListOfCoffeeStoresPhotos();
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
        }
      };
      
      const response=await fetch(getUrlForCoffeeStores('31.993343937295887%2C35.85323872270549','coffee stores',6), options)
       const data=await response.json();

       return data.results.map((result,index)=>{
        console.log('index',index);
        return{
            id:result.fsq_id,
            address:result.location.address,
            name:result.name,
            formattedAddress:result.location.formatted_address,
            imgUrl:photos.length>0 ? photos[index]:null,
        }
       });
}