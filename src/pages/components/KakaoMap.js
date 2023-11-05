import { useEffect, useState } from "react";
import bikeStationData from "./bikeStationData.json";
const { kakao } = window;

const KakaoMap = ({onClickMarker}) => {
  const [lat, setLat] = useState(37.62019307507592);
  const [long, setLong] = useState(127.0586406171661);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([])
  const bikeInformationData = bikeStationData.DATA;
  const updateMarkder = (map, leftTop, rightBottom) => {
    const newMarkers = []
    // Clear all markers in map
    markers.forEach((marker) => {
      marker.setMap(null);
    })

    for (let i = 0; i < bikeInformationData.length; i++) {
      const bikeStation = bikeInformationData[i];
      // if lat and lnt is not in the range, remove marker
      if (bikeStation.statn_lat < leftTop.getLat() || bikeStation.statn_lat > rightBottom.getLat() || bikeStation.statn_lnt < leftTop.getLng() || bikeStation.statn_lnt > rightBottom.getLng()) {
        continue;
      }

      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(bikeStation.statn_lat, bikeStation.statn_lnt),
        text: `[${bikeStation.lendplace_id}]`,
        clickable: true,
        id: bikeStation.lendplace_id,
      })
      const infoWindow = new kakao.maps.InfoWindow({
        content: '<div style="padding:5px;font-size:12px;">[' + bikeStation.lendplace_id + '] &nbsp; ' + bikeStation.statn_addr2 + '</div>',
        removable: true,
      });

      // 마커에 마우스오버 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'mouseover', () => {
        infoWindow.open(map, marker);
      });

      kakao.maps.event.addListener(marker, 'mouseout', () => {
        setTimeout(() => {
          infoWindow.close();
        }, 500);
      });

      // 마커 이벤트 리스너 등록
      kakao.maps.event.addListener(marker, 'click', () => {
        onClickMarker(marker, bikeStation);
      });
      newMarkers.push(marker);
    }

    setMarkers(newMarkers);
  }
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(lat, long),
      level: 3
    }

    // 
    const map = new kakao.maps.Map(container, options);
    setMap(map);
    
    
    kakao.maps.event.addListener(map, 'dragend', () => {
      const leftTop = map.getBounds().getSouthWest();
      const rightBottom = map.getBounds().getNorthEast();
      updateMarkder(map, leftTop, rightBottom);

    })

    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      const leftTop = map.getBounds().getSouthWest();
      const rightBottom = map.getBounds().getNorthEast();
      updateMarkder(map, leftTop, rightBottom);
    })
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.BICYCLE);
    updateMarkder(map, map.getBounds().getSouthWest(), map.getBounds().getNorthEast());

    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    }); 
  }, [])

  useEffect(() => {
    if (map) {
      const moveLatLon = new kakao.maps.LatLng(lat, long);
      map.setCenter(moveLatLon);
    }
  }, [lat, long])

  return (
    <div id="map" style={{
      width: '100%',
      height: '100%'
    }}></div>
  )
}

export default KakaoMap;