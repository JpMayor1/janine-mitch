import { TemplateHandler } from "easy-template-x";
import { readFileSync, writeFileSync } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";

export async function POST (request: Request) {
  const form = await request.json();

  switch (form.type) {
    case 'indigency':
      try {
        const indigency = readFileSync(join(__dirname, '../../../../../public', 'indigency.docx'));

        const handler = new TemplateHandler();
        const doc = await handler.process(indigency, form.data);
        
        writeFileSync(join(__dirname, '../../../../../public', 'out-indigency.docx'), doc);

        return NextResponse.json({ buffer: doc }, { status: 200 });
        
      } catch (error) {
        console.log(error);
        return NextResponse.json({}, { status: 500 });
      }
    
    case 'clearance':
      try {
        const clearance = readFileSync(join(__dirname, '../../../../../public', 'clearance.docx'));
  
        const handler = new TemplateHandler();
        const doc = await handler.process(clearance, form.data);
          
        writeFileSync(join(__dirname, '../../../../../public', 'out-clearance.docx'), doc);
  
        return NextResponse.json({ buffer: doc }, { status: 200 });
          
      } catch (error) {
        console.log(error);
        return NextResponse.json({}, { status: 500 });
      }

    case 'request':
        try {
          const request = readFileSync(join(__dirname, '../../../../../public', 'request.docx'));
    
          const handler = new TemplateHandler();
          const doc = await handler.process(request, form.data);
            
          writeFileSync(join(__dirname, '../../../../../public', 'out-request.docx'), doc);
    
          return NextResponse.json({ buffer: doc }, { status: 200 });
            
        } catch (error) {
          console.log(error);
          return NextResponse.json({}, { status: 500 });
        }
  }
}