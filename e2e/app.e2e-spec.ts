import { NgAnimationsPage } from './app.po';

describe('ng-animations App', () => {
  let page: NgAnimationsPage;

  beforeEach(() => {
    page = new NgAnimationsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
