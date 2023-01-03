import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { BitcoinChart } from 'src/app/model/bitcoin-chart.model';

const RATE_DATA = 'https://blockchain.info/ticker?format=json&cors=true&'
const TRADE_VOLUME_DATA = 'https://api.blockchain.info/charts/trade-volume?format=json&cors=true&'
const AVG_BLOCK_SIZE_DATA = 'https://api.blockchain.info/charts/avg-block-size?format=json&cors=true&'
const MARKET_PRICE_DATA = 'https://api.blockchain.info/charts/market-price?format=json&cors=true&'


@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private http: HttpClient) { }

  private _marketPrice$ = new BehaviorSubject<BitcoinChart>({} as BitcoinChart)
  private _tradeVolume$ = new BehaviorSubject<BitcoinChart>({} as BitcoinChart)
  private _avgBlockSize$ = new BehaviorSubject<BitcoinChart>({} as BitcoinChart)
  private _rate$ = new BehaviorSubject<number>(1)

  public marketPrice$ = this._marketPrice$.asObservable()
  public tradeVolume$ = this._tradeVolume$.asObservable()
  public avgBlockSize$ = this._avgBlockSize$.asObservable()
  public rate$ = this._rate$.asObservable()

  query(span = 'timespan=6months', avg = 'rollingAverage=1days') {
    this._getMarketPrice(span, avg)
    this._getTradeVolume(span, avg)
    this._getAvgBlockSize(span, avg)
  }

  public getRate(currency = 'USD'){
    this.http.get(RATE_DATA)
      .pipe(
        map((res:any) => {
          if (res[currency]) return res[currency].last
          return res!.USD!.last
        })
      )
      .subscribe(rate => this._rate$.next(rate))
  }

  _getMarketPrice(span = 'timespan=6months', avg = 'rollingAverage=1days') {
    this.http.get<{ values: [{ x: number, y: number }] }>(MARKET_PRICE_DATA + `${span}&${avg}`)
      .pipe(
        map(({ values }) => values.map(({ x, y }) => ({ name: new Date(x * 1000).toLocaleDateString(), value: y })))
      ).subscribe(
        next => {
          this._marketPrice$.next({
            title: `Market Price (USD)`,
            description: `The average USD market price across major bitcoin exchanges.`,
            fill: '#ffa600',
            stroke: '#774e03',
            unit: 'USD',
            data: next,
            x: 'Timespan',
            y: 'USD'
          })
        },
        console.log,
        () => { console.log(`market chart`) }
      )
  }
  _getTradeVolume(span = 'timespan=6months', avg = 'rollingAverage=1days') {
    this.http.get<{ values: [{ x: number, y: number }] }>(TRADE_VOLUME_DATA + `${span}&${avg}`)
      .pipe(
        map(({ values }) => values.map(({ x, y }) => ({ name: new Date(x * 1000).toLocaleDateString(), value: y })))
      ).subscribe(
        next => {
          this._tradeVolume$.next({
            title: `Exchange Trade Volume (USD)`,
            description: `The total USD value of trading volume on major bitcoin exchanges.`,
            fill: '#11ffbb',
            stroke: '#118e7f',
            unit: 'USD',
            data: next,
            x: 'Timespan',
            y: 'USD'
          })
        },
        console.log,
        () => { console.log(`trade chart`) }
      )
  }
  _getAvgBlockSize(span = 'timespan=6months', avg = 'rollingAverage=1days') {
    return this.http.get<{ values: [{ x: number, y: number }] }>(AVG_BLOCK_SIZE_DATA + `${span}&${avg}`)
      .pipe(
        map(({ values }) => values.map(({ x, y }) => ({ name: new Date(x * 1000).toLocaleDateString(), value: y })))
      ).subscribe(
        next => {
          this._avgBlockSize$.next({
            title: `Average Block Size (MB)`,
            description: `The average block size over the past 24 hours in megabytes.`,
            fill: '#5f00ff',
            stroke: '#36007e',
            unit: 'MB',
            data: next,
            x: 'Timespan',
            y: 'MB'
          })
        },
        console.log,
        () => { console.log(`block chart`) }
      )
  }

}

interface Rate {
  object: {
    "15m": number,
    "last": number,
    "buy": number,
    "sell": number,
    "symbol": string
    }
}