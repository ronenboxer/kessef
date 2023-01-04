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
  private _requestProps$ = new BehaviorSubject<any>({
    currency: 'USD',
    span: [6, 'months'],
    avg: [1, 'days']
  })

  public marketPrice$ = this._marketPrice$.asObservable()
  public tradeVolume$ = this._tradeVolume$.asObservable()
  public avgBlockSize$ = this._avgBlockSize$.asObservable()
  public rate$ = this._rate$.asObservable()
  public requestProps$ = this._requestProps$.asObservable()


  query() {
    this._getMarketPrice()
    this._getTradeVolume()
    this._getAvgBlockSize()
  }

  public getRate() {
    const { currency } = this._requestProps$.value
    this.http.get(RATE_DATA)
      .pipe(
        map((res: any) => {
          if (res[currency]) return res[currency].last
          return res!.USD!.last
        })
      )
      .subscribe(rate => this._rate$.next(rate))
  }

  public async setChartProps(props: { currency?: string, span?: (string | number)[], avg?: (string | number)[] }) {
    this._requestProps$.next({
      ...this._requestProps$.value,
      ...props
    })
    this.query()
  }

  _getMarketPrice() {
    const { span, avg } = this._requestProps$.value
    this.http.get<{ values: [{ x: number, y: number }] }>(MARKET_PRICE_DATA + `timespan=${span.join('')}&rollingAverage=${avg.join('')}`)
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
        }
      )
  }
  _getTradeVolume() {
    const { span, avg } = this._requestProps$.value
    this.http.get<{ values: [{ x: number, y: number }] }>(TRADE_VOLUME_DATA + `timespan=${span.join('')}&rollingAverage=${avg.join('')}`)
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
        }
      )
  }
  _getAvgBlockSize() {
    const { span, avg } = this._requestProps$.value
    return this.http.get<{ values: [{ x: number, y: number }] }>(AVG_BLOCK_SIZE_DATA + `timespan=${span.join('')}&rollingAverage=${avg.join('')}`)
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
        }
      )
  }

}