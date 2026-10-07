function validateSales(inputRows) {
const $input = {first:()=>({json:{data:inputRows}})};
const record = $input.first().json;
const rows = record.data;

const validated = rows.map(row => {
  const issues = [];
  let revenue = row.Revenue;
  let cost = row.Cost;
  let profit = row.Profit;
  let units = row['Units Sold'];
  let customers = row['Customer Count'];
  let date = row.Date;

  // Missing Revenue -> reconstruct from Cost + Profit
  if (revenue === undefined || revenue === null || revenue === '') {
    if (cost != null && profit != null) {
      revenue = cost + profit;
      issues.push('Revenue missing; set to Cost + Profit');
    } else {
      revenue = 0;
      issues.push('Revenue missing and unrecoverable; set to 0');
    }
  }

  // Missing Cost -> reconstruct from Revenue - Profit
  if (cost === undefined || cost === null || cost === '') {
    if (revenue != null && profit != null) {
      cost = revenue - profit;
      issues.push('Cost missing; set to Revenue - Profit');
    } else {
      cost = 0;
      issues.push('Cost missing and unrecoverable; set to 0');
    }
  }

  // Missing Profit -> reconstruct from Revenue - Cost
  if (profit === undefined || profit === null || profit === '') {
    profit = revenue - cost;
    issues.push('Profit missing; set to Revenue - Cost');
  }

  // Negative Units Sold -> take absolute value
  if (typeof units === 'number' && units < 0) {
    units = Math.abs(units);
    issues.push('Units Sold was negative; corrected to absolute value');
  }

  // Missing Units Sold -> flag, set to 0
  if (units === undefined || units === null || units === '') {
    units = 0;
    issues.push('Units Sold missing; set to 0');
  }

  // Missing Customer Count -> set to 0 and flag
  if (customers === undefined || customers === null || customers === '') {
    customers = 0;
    issues.push('Customer Count missing; set to 0');
  }

  // Missing or invalid Date -> flag
  if (!date || isNaN(new Date(date).getTime())) {
    issues.push('Date missing or invalid; flagged for manual review');
  }

  return {
    ...row,
    Revenue: revenue,
    Cost: cost,
    Profit: profit,
    'Units Sold': units,
    'Customer Count': customers,
    _validation_issues: issues
  };
});

const flagged = validated.filter(r => r._validation_issues.length > 0);

return [{
  json: {
    data: validated,
    validation_summary: {
      total_rows: validated.length,
      flagged_rows: flagged.length,
      flagged_details: flagged
    }
  }
}];
}
if(typeof module!=="undefined") module.exports={validateSales};
