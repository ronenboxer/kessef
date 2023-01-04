import { Component, inject, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';

@Component({
  selector: 'statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent implements OnInit {

  private bitcoinService = inject(BitcoinService)

  span = ''
  avg = ''

  ngOnInit(): void {
    this.bitcoinService.requestProps$.subscribe(props => {
      this.span = props.span.join('')
      this.avg = props.avg.join('')
    })
  }

  marketPrice$ = of(this.bitcoinService.marketPrice$)
  tradeVolume$ = of(this.bitcoinService.tradeVolume$)
  avgBlockSize$ = of(this.bitcoinService.avgBlockSize$)

  onSetChartProp(prop: string, value: (string | number)[]) {
    this.bitcoinService.setChartProps({[prop]: value})
  }
}
