import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BitcoinChart } from 'src/app/model/bitcoin-chart.model';

@Component({
  selector: 'chart-preview',
  templateUrl: './chart-preview.component.html',
  styleUrls: ['./chart-preview.component.scss']
})
export class ChartPreviewComponent implements OnInit {
  @Input() chart$!: Observable<BitcoinChart>;
  // options
  multi: any[] | null = null
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel!: string;
  yAxisLabel!: string;
  timeline: boolean = true;
  colorScheme!: any;

  title!: string;
  description!: string;
  fill!: string

  ngOnInit(): void {
    this.chart$.subscribe(({ title, description, data, x, y, fill }) => {
      this.multi = [{
        name: title,
        series: data || []
      }],
        this.xAxisLabel = x
      this.yAxisLabel = y
      this.title = title
      this.description = description
      this.fill = fill
      this.colorScheme = {
        domain: [fill]
      }
    })
  }

  formatPercent(val:number) {
    if (val <= 100) {
      return val + '%';
    } return '100 %'
  }
}