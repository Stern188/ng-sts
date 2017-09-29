import { NgCloudPage } from './app.po';

describe('ng-cloud App', () => {
  let page: NgCloudPage;

  beforeEach(() => {
    page = new NgCloudPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
