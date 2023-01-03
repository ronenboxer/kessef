import { Component, inject } from '@angular/core';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';

@Component({
  selector: 'statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent {

  private bitcoinService = inject(BitcoinService)

  marketPrice$ = this.bitcoinService.marketPrice$
  tradeVolume$ =this.bitcoinService.tradeVolume$
  avgBlockSize$=this.bitcoinService.avgBlockSize$


}
