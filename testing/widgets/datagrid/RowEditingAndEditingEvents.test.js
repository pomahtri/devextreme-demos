import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { Selector as $ } from 'testcafe';
import { runManualTest } from '../../../utils/visual-tests/matrix-test-helper';

fixture('DataGrid.RowEditingAndEditingEvents')
  .page('http://localhost:8080/')
  .beforeEach(async (t) => {
    await t
      .resizeWindow(900, 600);
  });

runManualTest(test, 'DataGrid', 'RowEditingAndEditingEvents', 'jQuery', (test) => {
  test.only('RowEditingAndEditingEvents', async (t) => {
    const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

    await t.click($('a').withText('Edit').nth(0));

    await takeScreenshot('datagrid_row_editing_and_editing_events_2_desktop');

    await t
      .typeText(
        $('.dx-datagrid-rowsview').find('input').nth(1),
        'Bob',
        { replace: true },
      );

    await takeScreenshot('datagrid_row_editing_and_editing_events_3_desktop');

    await t.click($('a').withText('Save').nth(0));

    await takeScreenshot('datagrid_row_editing_and_editing_events_4_desktop');

    await t
      .click('#clear')
      .click('.dx-icon-edit-button-addrow');

    await takeScreenshot('datagrid_row_editing_and_editing_events_5_desktop');

    await t
      .typeText(
        $('.dx-datagrid-rowsview').find('input').nth(1),
        'Bob',
        { replace: true },
      )
      .click($('a').withText('Save').nth(0));

    await takeScreenshot('datagrid_row_editing_and_editing_events_6_desktop', 3000);

    await t
      .click('#clear')
      .click($('a').withText('Delete').nth(2));

    await takeScreenshot('datagrid_row_editing_and_editing_events_7_desktop', 3000);

    await t.click($('.dx-dialog-buttons').find('.dx-dialog-button').nth(0));

    await takeScreenshot('datagrid_row_editing_and_editing_events_8_desktop', 3000);

    await t
      .expect(compareResults.isValid())
      .ok(compareResults.errorMessages());
  });
});
