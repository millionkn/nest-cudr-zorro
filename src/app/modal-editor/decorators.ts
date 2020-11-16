import { createKlassDecorator, createKeyDecorator } from 'src/app/utils/decorator';
import { Editor } from './utils';
import { Type } from '@angular/core';

export const EditorIs = createKeyDecorator(`EditorIs`, (klass: Type<any>, key: string) => <P, L extends P>(opt: {
  label: string,
  component: () => Type<Editor<any, P>>,
  params: (entity: any) => L,
}) => {
  return opt;
});

export const EditorTitle = createKlassDecorator('editorTitle', () => (str: string) => str);
