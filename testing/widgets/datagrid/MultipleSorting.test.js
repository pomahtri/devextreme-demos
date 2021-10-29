import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import { Selector as $ } from 'testcafe';
import { runManualTest } from '../../../utils/visual-tests/matrix-test-helper';

fixture('DataGrid.MultipleSorting')
  .page('http://localhost:8080/')
  .beforeEach(async (t) => {
    await t
      .resizeWindow(900, 600);
  });

runManualTest(test, 'DataGrid', 'MultipleSorting', 'jQuery', (test) => {
  test.only('MultipleSorting', async (t) => {
    const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

    await t
      .click($('.dx-datagrid-headers .dx-datagrid-action:eq(3)'), {
        modifiers: {
          shift: true,
        },
      })
      .click($('.dx-datagrid-headers .dx-datagrid-action:eq(4)'), {
        modifiers: {
          shift: true,
        },
      });

    await takeScreenshot('datagrid_multiple_sorting_2_desktop');

    await t
      .click($('.dx-datagrid-headers .dx-datagrid-action:eq(5)'));

    await takeScreenshot('datagrid_multiple_sorting_3_desktop');

    await t
      .click($('.dx-datagrid-headers .dx-datagrid-action:eq(5)'), {
        modifiers: {
          ctrl: true,
        },
      });

    await takeScreenshot('datagrid_multiple_sorting_4_desktop');

    await t
      .rightClick($('.dx-header-row .dx-datagrid-action:eq(0)'));

    await takeScreenshot('datagrid_multiple_sorting_5_desktop');

    await t
      .expect(compareResults.isValid())
      .ok(compareResults.errorMessages());
  });
});
