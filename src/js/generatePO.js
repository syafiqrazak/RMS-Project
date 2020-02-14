// import jsPDF from 'jspdf';
import * as jsPDF from "jspdf";
import "jspdf-autotable";
import "dateformat";

class generatePO {
  static printPDF(poObj) {
    var dateFormat = require('dateformat');
    // var fileName = "PO/TRD-" + poObj.po_no + ".pdf";
    // alert("printPDF");
    // var doc = new jsPDF();

    // doc.text("Hello world!", 100, 10);
    // doc.save(fileName);
    var height = 0;
    var doc = new jsPDF();
    var col = ["Sr. No.", "Details"];
    var col1 = ["Details", "Values"];
    var rows = [];
    var rows1 = [];
    var rows3 = [];
    var col3 = [
      "No.",
      "Description",
      "Price(RM)",
      "Quantity",
      "Total Price(RM)"
    ];

    /* The following array of object as response from the API req  */

    var itemNew = [
      { index: "1", id: "Case Number", name: "101111111" },
      { index: "2", id: "Patient Name", name: "UAT DR" },
      { index: "3", id: "Hospital Name", name: "Dr Abcd" }
    ];

    itemNew.forEach(element => {
      var temp = [element.index, element.id];
      var temp1 = [element.index, element.name];
      rows.push(temp);
      rows1.push(temp1);
    });
    poObj.po_desc.forEach(element => {
      var temp3 = [
        element.index,
        element.description,
        element.quantity,
        element.unitPrice,
        element.quantity * element.unitPrice
      ];
      rows3.push(temp3);
    });
    doc.text(75, 10, "DINASTIA JATI SDN BHD");
    doc.setFontSize(8);
    doc.text(70, 15, "Co. Registration No. : 255157-U / GST No. 001263861760");

    doc.setFontSize(10);
    doc.text(
      100,
      20,
      "3A-6A, Jalan PJU 8/3A, Perdana Business Centre, Damansara Perdana. 47820 Petaling Jaya,",
      "center"
    );
    doc.text(100, 25, "Selangor Darul Ehsan. MALAYSIA.", "center");
    doc.text(100, 30, "Tel : +603-7722 3842   Fax : +603-7727 2601", "center");

    doc.setFontSize(15);
    doc.setFontType("bold");
    doc.text(100, 50, "PURCHASE ORDER", "center");

    doc.setFontSize(10);
    doc.setFontType("normal");
    // if(poObj.cl_neme)
    //     doc.cell(10, 70, 100, 15, poObj.cl_name);
    // else
    //     doc.cell(10, 70, 100, 15, "Client Name");
    // doc.cell(110, 70, 45, 15, "Purchase Order No.", "right");
    // // doc.cell(40, 40, 50, 20, "cell", 'top');
    // doc.cell(160, 70, 45, 15, poObj.po_no);

    
        doc.line(10, 60, 200, 60);
        doc.line(10, 60, 10, 140);
        doc.line(200, 60, 200, 140);
        doc.line(10, 140, 200, 140);

        doc.line(105, 60, 105, 140);
        doc.line(155, 60, 155, 140);
        
        // doc.line(105, 68, 200, 68);
        doc.line(105, 68, 200, 68);
        doc.line(105, 76, 200, 76);
        doc.line(105, 84, 200, 84);
        doc.line(105, 92, 200, 92);
        doc.line(105, 100, 200, 100);
        doc.line(105, 108, 200, 108);
        doc.line(105, 116, 200, 116);
        doc.line(105, 124, 200, 124);
        doc.line(105, 132, 200, 132);
        doc.line(105, 140, 200, 140);

        doc.text(108, 65, "Purchase Order");
        doc.text(108, 73, "Date");
        doc.text(108, 81, "Page Number");
        doc.text(108, 89, "Our Reference");
        doc.text(108, 97, "Your Quotation");
        doc.text(108, 105, "Delivery Due Date");
        doc.text(108, 113, "Mode of Shipment");
        doc.text(108, 121, "PSR No.");
        doc.text(108, 129, "CCA No.");
        doc.text(108, 137, "Mode of Payment");

        doc.text( 158, 65, poObj.po_no.toString());
        doc.text(158, 73, dateFormat(poObj.createdAt,"d mmm, yyyy"));
        doc.text(158, 81, "0");
        doc.text(158, 89, poObj.po_ref);
        doc.text(158, 97, poObj.po_ref);
        doc.text(158, 105, dateFormat(poObj.delv_due,"d mmm, yyyy"));
        doc.text(158, 113, poObj.ship_mode);
        // doc.text(158, 121, poObj.psr_id);
        doc.text(158, 129, poObj.cca_no);
        doc.text(158, 137, poObj.pay_mode);
    
    doc.autoTable(col3, rows3, { startY: 155 });
    height = doc.autoTableEndPosY();
    doc.text(20, height + 5, "Total");

    // doc.autoTable(col3, rows3, { startY: 40 });
    // doc.autoTable(col1, rows1);
    doc.save("Test.pdf");
  }
}

export default generatePO;
