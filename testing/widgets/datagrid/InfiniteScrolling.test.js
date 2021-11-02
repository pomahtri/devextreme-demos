import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { Selector as $, ClientFunction } from 'testcafe';
import { runManualTest } from '../../../utils/visual-tests/matrix-test-helper';

fixture('DataGrid.InfiniteScrolling')
  .page('http://localhost:8080/')
  .beforeEach(async (t) => {
    await t
      .resizeWindow(900, 600);
  });

const roundScrollPosition = ClientFunction((divider) => {
  const currentScrollPosition = document.querySelector('.dx-scrollable-container').scrollTop;
  const newScrollPosition = Math.round(currentScrollPosition / divider) * divider;
  document.querySelector('.dx-scrollable-container').scrollTop = newScrollPosition;
});

runManualTest(test, 'DataGrid', 'InfiniteScrolling', 'jQuery', (test) => {
  test.only('InfiniteScrolling', async (t) => {
    const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

    await t.hover($('.dx-datagrid-rowsview'));
    await takeScreenshot('datagrid_infinite_scrolling_2_desktop.png');

    await t
      .hover($('.dx-scrollbar-vertical .dx-scrollable-scroll'))
      .drag($('.dx-scrollbar-vertical .dx-scrollable-scroll'), 0, 250)
      .wait(1000);

    await roundScrollPosition(50);
    await t.wait(1000);

    await takeScreenshot('datagrid_infinite_scrolling_3_desktop.png');

    await t
      .expect(compareResults.isValid())
      .ok(compareResults.errorMessages());
  });
});
