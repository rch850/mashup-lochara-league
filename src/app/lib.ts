import { Character } from "./character";
import { characters } from "./data";

export function query(latlng): Character[] {
  let chars = characters as Character[]
  const includeIds = [3248, 2464]
  chars = chars.filter(ch => {
    return includeIds.includes(ch.id)
  })
  chars.forEach(ch => {
    ch.distance = getDistanceFromLatLonInKm(
        latlng.lat, latlng.lng,
        ch.latitude, ch.longitude)
  })
  chars.sort((a, b) => a.distance - b.distance)
  chars = chars.slice(0, 3)

  let totalDistance = chars.reduce((total, ch) => {
    return total + ch.distance
  }, 0)
  chars.forEach(ch => {
    ch.percentage = Math.floor(ch.distance / totalDistance * 100)
  })

  return chars
}

export function calcMorpherWeights(
    characters: Character[],
    images: { src: string }[]
) {
  return images.map(conf => {
    let char = characters.find(ch => {
      return conf.src.includes(`localchara-${ch.id}`)
    })
    if (char) return char.percentage / 100
    return 0
  })
}

/**
 * https://stackoverflow.com/a/27943
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 */
function getDistanceFromLatLonInKm(lat1: number, lon1: number,
    lat2: number, lon2: number): number {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI/180)
}
