function getSeoulPopulationData() {
  const populationData = [
    { district: "강남구", population: 543828, lat: 37.5172, lng: 127.0473 },
    { district: "강동구", population: 426877, lat: 37.5309, lng: 127.1238 },
    { district: "강북구", population: 314403, lat: 37.6396, lng: 127.0257 },
    { district: "강서구", population: 578551, lat: 37.5651, lng: 126.8227 },
    { district: "관악구", population: 493594, lat: 37.4784, lng: 126.9516 },
    { district: "광진구", population: 355646, lat: 37.5385, lng: 127.0825 },
    { district: "구로구", population: 415275, lat: 37.4952, lng: 126.8877 },
    { district: "금천구", population: 235667, lat: 37.4569, lng: 126.8954 },
    { district: "노원구", population: 547218, lat: 37.6552, lng: 127.0773 },
    { district: "도봉구", population: 328102, lat: 37.6688, lng: 127.047 },
    { district: "동대문구", population: 348176, lat: 37.5744, lng: 127.0395 },
    { district: "동작구", population: 393817, lat: 37.5121, lng: 126.9395 },
    { district: "마포구", population: 362982, lat: 37.5665, lng: 126.9018 },
    { district: "서대문구", population: 305184, lat: 37.5791, lng: 126.9368 },
    { district: "서초구", population: 432525, lat: 37.4835, lng: 127.0322 },
    { district: "성동구", population: 292674, lat: 37.5509, lng: 127.0403 },
    { district: "성북구", population: 437485, lat: 37.6066, lng: 127.0238 },
    { district: "송파구", population: 635432, lat: 37.5145, lng: 127.106 },
    { district: "양천구", population: 456332, lat: 37.5271, lng: 126.8561 },
    { district: "영등포구", population: 389727, lat: 37.526, lng: 126.8969 },
    { district: "용산구", population: 230441, lat: 37.532, lng: 126.99 },
    { district: "은평구", population: 463177, lat: 37.6176, lng: 126.9227 },
    { district: "종로구", population: 153219, lat: 37.572, lng: 126.9793 },
    { district: "중구", population: 125761, lat: 37.564, lng: 126.9975 },
    { district: "중랑구", population: 395312, lat: 37.6065, lng: 127.0927 },
  ];

  return populationData;
}

module.exports = {
  getSeoulPopulationData,
};
