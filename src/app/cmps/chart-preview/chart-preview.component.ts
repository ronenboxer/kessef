import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BitcoinChart } from 'src/app/model/bitcoin-chart.model';

@Component({
  selector: 'chart-preview',
  templateUrl: './chart-preview.component.html',
  styleUrls: ['./chart-preview.component.scss']
})
export class ChartPreviewComponent implements OnInit, AfterViewInit {
  @Input() chart$?: Observable<BitcoinChart> | null;
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
  xAxisTicks: string[] = []

  title!: string;
  description!: string;
  fill!: string

  ngOnInit(): void {
    if (this.chart$) this.chart$.subscribe(({ title, description, data, x, y, fill }) => {
      const delta = Math.floor((data?.length || 0) / (window.innerWidth / 100))
      this.multi = [{
        name: title,
        series: data || []
      }],
        this.xAxisTicks = data?.filter((d, idx) => idx % delta === 0).map(d => d.name) || []
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
  ngAfterViewInit(): void {
    if (this.chart$) this.chart$.subscribe(({ title, description, data, x, y, fill }) => {
      const delta = Math.floor((data?.length || 0) / (window.innerWidth / 100))
      this.multi = [{
        name: title,
        series: data || []
      }],
        this.xAxisTicks = data?.filter((d, idx) => idx % delta === 0).map(d => d.name) || []
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

  formatPercent(val: number) {
    if (val <= 100) {
      return val + '%';
    } return '100 %'
  }
}