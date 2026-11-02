import { Component, inject } from '@angular/core';
import { Languages } from '../../services/languages';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="mt-10 bg-[#231F20] py-8 text-center text-gray-400">
      <div class="font-bold text-[#AD974F]">{{ lang.t('brand') }}</div>
      <div class="text-sm">{{ lang.t('footerCity') }}</div>
      <div class="mt-2 text-xs">{{ lang.t('rights') }}</div>
    </footer>
  `,
})
export class Footer {
  lang = inject(Languages);
}