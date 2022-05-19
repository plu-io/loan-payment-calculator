window.onload = function() {

  document.getElementById("bodyBox").innerHTML = "<p></p>";

  function roundDec(val, dec) {
    // val: number to be rounded, dec: number of decimal points (1 = 1.2, 2 = 1.23)
    let scale = Math.pow(10, dec);
    let rounded = Math.round(val * scale) / scale;

    return rounded;
  }

  function calcPayment() {
    let loanInfo = {
      amount:   document.getElementById("inputMoney").value,
      years:    document.getElementById("inputYears").value,
      interest: document.getElementById("inputInterest").value,
      payment:  0
    };

    // calculate total monthly payment (principal and interest)
    loanInfo.payment = (loanInfo.amount * loanInfo.interest / 100 / 12)/(1 - (1 + loanInfo.interest / 100 / 12) ** (-12 * loanInfo.years));

    if (loanInfo.amount > 0 && loanInfo.years > 0 && loanInfo.payment > 0) {
      var payTableData =  "<table><tr><th>Month</th><th>Interest</th><th>Principal</th><th>New Princ.</th><th>Tot. Int.</th><th>Tot. Princ.</th><th>Total Paid</th></tr>";

      // calculate all monthly payments
      var tempInterest  = loanInfo.amount * loanInfo.interest / 100 / 12;
      var tempPrincipal = loanInfo.payment - tempInterest;
      var newPrincipal  = loanInfo.amount - tempPrincipal;
      var totInterest   = tempInterest;
      var totPrincipal  = tempPrincipal;
      var totPaid       = loanInfo.payment;

      // create array of pay data
      var paySch = [[1, tempInterest, tempPrincipal, newPrincipal, totInterest, totPrincipal, totPaid]];
      payTableData += "<tr><td>" + paySch[0][0] + "</td><td>" + paySch[0][1].toFixed(3) + "</td><td>" + paySch[0][2].toFixed(3) +
                      "</td><td>" + paySch[0][3].toFixed(3) + "</td><td>" + paySch[0][4].toFixed(3) +
                      "</td><td>" + paySch[0][5].toFixed(3) + "</td><td>" + paySch[0][6].toFixed(3) + "</td></tr>";
      for (let i = 1; i < loanInfo.years * 12; i++) {
        tempInterest  = newPrincipal * loanInfo.interest / 100 / 12;
        tempPrincipal = loanInfo.payment - tempInterest;
        newPrincipal -= tempPrincipal;
        totInterest  += tempInterest;
        totPrincipal += tempPrincipal;
        totPaid      += loanInfo.payment;
        paySch.push([i + 1, tempInterest, tempPrincipal, newPrincipal, totInterest, totPrincipal, totPaid]);
        payTableData += "<tr><td>" + paySch[i][0] + "</td><td>" + paySch[i][1].toFixed(3) + "</td><td>" + paySch[i][2].toFixed(3) +
                        "</td><td>" + paySch[i][3].toFixed(3) + "</td><td>" + paySch[i][4].toFixed(3) +
                        "</td><td>" + paySch[i][5].toFixed(3) + "</td><td>" + paySch[i][6].toFixed(3) + "</td></tr>";
      }
      payTableData += "</table>";
      document.getElementById("bodyBox").innerHTML = payTableData;
    } else {
      document.getElementById("bodyBox").innerHTML = "<h3>Verify data entered is accurate.</h3>";
    }
  }
  document.getElementById("goButton").onclick = calcPayment;
}
