import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {

  constructor() { }

  async loadCitys(zipCode: number) {
    const API_KEY = 'e819a7b0-bb65-11ee-97db-3dce17136e95';
    let url = `https://app.zipcodebase.com/api/v1/search?apikey=${API_KEY}&codes=${zipCode}`;
    try {
      let response = await fetch(url);
      if (!response.ok) throw new Error(`Error in request: ${response.statusText}`);
      let responseJSON = await response.json();
      return responseJSON
    }
    catch (error) {
      console.error('Error loading cities:', error);
      throw error;
    }
  }


  async getArrayOfCitys(zipCode: number): Promise<string[]> {
    try {
      let search = await this.loadCitys(zipCode);
      let results = [];
      for (let i = 0; i < search.results[zipCode].length; i++) {
        let city = search.results[zipCode][i].city;
        let country = search.results[zipCode][i].country_code;
        if (city && country) results.push(`${country} ${city}`)
      }
      return results
    }
    catch {
      return []
    }
  }

}
