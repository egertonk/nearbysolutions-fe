import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";

const MAPBOX_TOKEN = "your-mapbox-access-token";

const MyMap = () => {
  const [viewState, setViewState] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 10,
  });

  // // duplicate
  // const customerOrder = useSelector(
  //   (state: RootState) => state.formData.customerOrder
  // );
  // // const address = `${customerOrder.customerInfo.address}, ${customerOrder.customerInfo.city}, ${customerOrder.customerInfo.state}, ${customerOrder.customerInfo.zip}.`;
  // const address = "10308 Gazelle Ct, Fredericksburg, VA 22408";
  // const [imageUrl, setImageUrl] = useState("");

  // const googleMapURL = "https://maps.googleapis.com/maps/api/staticmap";
  // const apiKey = "AIzaSyCkpoGe0dJZVeOo6Rq0k22WS6gPOHsDuuA";
  // const signature = "YQLhWfyFuKgCykLi7ynJv2gAjTE=";

  // const fetchMap = () => {
  //   const baseUrl = `${googleMapURL}?size=512x512&maptype=roadmap\&markers=size:mid%7Ccolor:red%7C${address},CA&key=${apiKey}`;
  //   setImageUrl(baseUrl);
  // };

  // useEffect(() => {
  //   fetchMap();
  // }, [customerOrder]);

  return (
    <>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "400px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker latitude={37.7749} longitude={-122.4194} />
      </Map>
      {/* <div className="flex justify-center items-center m-5">
        {imageUrl && <img src={imageUrl} alt="Static Map" />}
      </div> */}
    </>
  );
};

export default MyMap;
