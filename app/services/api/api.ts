/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from 'apisauce';
import Config from '@/config';
import type { ApiConfig } from './api.types';
import { GeneralApiProblem, getGeneralApiProblem } from './apiProblem';
import { delay } from '@/utils/delay';

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
  apiKey: Config.API_KEY,
};

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class LastFmApi {
  apisauce: ApisauceInstance;
  config: ApiConfig;
  version: string;
  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(version = '2.0', config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.version = version;
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  /**
   * Gets a list of albums .
   */
  async getTopAlbums(
    artist: string,
  ): Promise<{ kind: 'ok'; data?: TopAlbumsResponse } | GeneralApiProblem> {
    // make the api call
    await delay(5000);
    const response: ApiResponse<TopAlbumsResponse> = await this.apisauce.get(
      `${this.version}`,
      {
        method: 'artist.gettopalbums',
        api_key: this.config.apiKey,
        format: 'json',
        artist,
      },
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data;

      return { kind: 'ok', data: rawData };
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack);
      }
      return { kind: 'bad-data' };
    }
  }

  /**
   * Gets album info .
   */
  async getAlbumInfo(
    mbid: string,
  ): Promise<{ kind: 'ok'; data?: AlbumInfo } | GeneralApiProblem> {
    // make the api call
    await delay(5000);
    const response: ApiResponse<AlbumInfoResponse> = await this.apisauce.get(
      `${this.version}`,
      {
        method: 'album.getinfo',
        api_key: this.config.apiKey,
        format: 'json',
        mbid,
      },
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data?.album;
      return { kind: 'ok', data: rawData };
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack);
      }
      return { kind: 'bad-data' };
    }
  }

  /**
   * Gets artist info .
   */
  async getArtistInfo(
    name: string,
  ): Promise<{ kind: 'ok'; data?: ArtistInfo } | GeneralApiProblem> {
    // make the api call
    await delay(5000);
    const response: ApiResponse<ArtistResponse> = await this.apisauce.get(
      `${this.version}`,
      {
        method: 'artist.getinfo',
        api_key: this.config.apiKey,
        format: 'json',
        artist: name,
      },
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data?.artist;
      return { kind: 'ok', data: rawData };
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack);
      }
      return { kind: 'bad-data' };
    }
  }
}

// Singleton instance of the API for convenience
export const lastFmApiV2 = new LastFmApi('2.0');
