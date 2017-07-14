# angular2-powerbi

## Installation

To install this library, run:

```bash
$ npm install angular2-powerbi --save
```

## Consuming the library

from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { PowerBIModule } from 'angular2-powerbi';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    PowerBIModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<powerbi-component embedUrl="https://app.powerbi.com/reportEmbed?reportId=bd851208e"
accessToken="H4sIAAAAAAAEAB2WtQ70CBKE3" type="report" id="bd851208"></powerbi-component> 
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Diego Plascencia](mailto:diego-d@outlook.com)
