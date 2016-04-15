/**
 * @projectDescription QwikFeaso
 * 
 * @author vivek Gidmare(vivek.gidmare@quagnitia.com)
 * @version 1.0
 */
Ti.include('/services/DataBaseTransaction.js')

//=======
/**
 * returns list of dwelling depends on build quality and build difficulty
 * 
 * @param {Object} Quality
 * @param {Object} Difficulty
 */
function TempDwellingList (Quality,Difficulty) {
	
var DBFeaso = Ti.Database.open('QwikFeaso');
	DBFeaso.execute('create table if not exists TempDwellingDetailsSummary(DwellingDetailSummaryID INTEGER PRIMARY KEY AUTOINCREMENT,DwellingID INT,TotalLivingAreaM2 REAL,TotalLivingAreaFt2 REAL,TotalConstructionAreaM2 REAL,TotalConstructionAreaFt2 REAL,TotalConstructionCostM2 INT,TotalConstructionCostFt2 INT,Summary TEXT,BuildQuality TEXT,BuildDifficulty TEXT,IsDeleted INT);');
  
  DBFeaso.execute('delete from TempDwellingDetailsSummary');
  resultset=DBFeaso.execute('select * from TempDwellingDetailsSummary');	
	
	DBFeaso.execute('BEGIN;');
	
	var Diff=Difficulty;
	var Percent_Allowances=DBFeaso.execute('select Value from RoomDimensionSettings where RoomDimensionSettingID=2');
		var Percents=Percent_Allowances.fieldByName('Value');
		var DecimalPercent=Percents/100;
		Ti.API.info('Percents'+Percents+':='+DecimalPercent); 
	 Percent_Allowances.close();//**
	  if(!resultset.isValidRow())
		 	{//if Table has no value the insert default value provided by Client
		 		Ti.API.info('Inside Temp if');
		 		var DwellingIDresultset=DBFeaso.execute('select * from Dwellings');
		 	   
		 	   while(DwellingIDresultset.isValidRow())
				{
						var InternalRoomArea=0;	
						var KitchenArea=0;
						var BathroomsArea=0;
						var DeckArea=0;
						var GarageArea=0;
									
						var NoOfBedRoom=0;
						var NoOfKitchen=0;
						
						var NoOfBathrooms=0;
						var NoOfCarParks=0		
						
						var NoOfLoungeroom=0;
						var NoOfDiningRoom=0;
						var NoOfFamillyRooms=0;
						var NoOfRumPusRoom=0;
						var NoOfVerandah=0;
						var NoOfBalcony=0;
						
						var InternalRoomAreaWithPercentAllowance;
						
						var InternalRoomCost=0; var KitchenCost=0; var BathroomCost=0; var DecksCost=0;var GaragesCost=0;
						
						var BuiledQuality=0;//for Standard default
						var BuildDifficulty=0;//easy default
						
						var BuiledDiffRS=DBFeaso.execute("select * from BuildDifficulty where IsDeleted=0 and Name ='"+Diff+"'");//for easy
						
						var DwellingID=DwellingIDresultset.fieldByName('DwellingID');
						
			 				var RoomCategoryIDresultset=DBFeaso.execute('select * from RoomCategory');
						 	 while(RoomCategoryIDresultset.isValidRow())
								{
									var RoomCategoryID=RoomCategoryIDresultset.fieldByName('RoomCategoryID');
									var SubCategoryResult=DBFeaso.execute('select RoomSubCategotyID,AreaM2 from RoomSubsCategory where RoomCategoryID='+RoomCategoryID);	
								      while(SubCategoryResult.isValidRow())
												{
											var RoomSubCategotyID=SubCategoryResult.fieldByName('RoomSubCategotyID');
											var RoomSubCategoryAreaM2=SubCategoryResult.fieldByName('AreaM2');
											var Quantity=DBFeaso.execute('select DwellingQuantity from DwellingDetails where DwellingID='+DwellingID+' and RoomCategoryID='+RoomCategoryID+' and RoomSubCategotyID='+RoomSubCategotyID);
											var RoomQuantity=Quantity.fieldByName('DwellingQuantity');
											
							//To Create Summary
											if(RoomCategoryID == 1)
											{//BedRoom
												NoOfBedRoom=NoOfBedRoom+RoomQuantity;
											}
											else
											if(RoomCategoryID ==3)
											{//Kitchen
												NoOfKitchen=NoOfKitchen+RoomQuantity;
												
											}
											else
											if(RoomCategoryID ==4)
											{//Bathrooms
												var OnlyBathroomNo=0;
												var ToiletNo=0
												if(RoomSubCategotyID >= 21 && RoomSubCategotyID <= 27)
												{
													OnlyBathroomNo=OnlyBathroomNo+RoomQuantity;
											
												}
												
												if(RoomSubCategotyID > 27 && RoomSubCategotyID <= 30)
												{
													ToiletNo=ToiletNo+RoomQuantity;
												}
												NoOfBathrooms=NoOfBathrooms+(OnlyBathroomNo+(ToiletNo/2));
												//Ti.API.info('OnlyBathroomNo :'+OnlyBathroomNo +' '+ToiletNo +' ::'+NoOfBathrooms);
											}
											else
											if(RoomCategoryID ==6)
											{//Decks
												var SingleGarageNo=0;
												var DoubleGarageNo=0;
												if(RoomSubCategotyID == 37)
												{
													SingleGarageNo=SingleGarageNo+RoomQuantity;
												}
												if(RoomSubCategotyID == 38)
												{
													DoubleGarageNo=DoubleGarageNo+(RoomQuantity*2);
												}
												NoOfCarParks=NoOfCarParks+(SingleGarageNo+DoubleGarageNo);
											}
											/*else
											{
												if(RoomSubCategotyID == 8)
												NoOfLoungeroom=RoomQuantity;
												if(RoomSubCategotyID == 9)
												NoOfDiningRoom=RoomQuantity;
												if(RoomSubCategotyID == 10)
												NoOfFamillyRooms=RoomQuantity;
												if(RoomSubCategotyID == 11)
												NoOfRumPusRoom=RoomQuantity;									
												if(RoomSubCategotyID == 21)
												NoOfVerandah=RoomQuantity;
												if(RoomSubCategotyID == 22)
												NoOfBalcony=RoomQuantity;
											}*/
							//To Calculate Total Living Area and Construction area and ConstructionCost
											if(RoomCategoryID == 1 || RoomCategoryID == 2)
											{
												InternalRoomArea=InternalRoomArea+(RoomSubCategoryAreaM2*RoomQuantity);
												InternalRoomAreaWithPercentAllowance=InternalRoomArea*(1+Percents/100);
				
											var BuiledQualityRS=DBFeaso.execute('select '+Quality+' from BuildQuality where BuildQualityID=4 and IsDeleted=0');//for standard
											
												BuiledQuality=BuiledQualityRS.fieldByName(''+Quality);
				
											BuildDifficulty=BuiledDiffRS.fieldByName('DefaultValue');
											BuiledQualityRS.close();
											InternalRoomCost=InternalRoomAreaWithPercentAllowance*(BuiledQuality*[BuildDifficulty/100]);
											}
											else
											if(RoomCategoryID == 3)
											{
												
												
												KitchenArea=KitchenArea+(RoomSubCategoryAreaM2*RoomQuantity);
											var BuiledQualityRS=DBFeaso.execute('select '+Quality+' from BuildQuality where BuildQualityID=5 and IsDeleted=0');
											BuiledQuality=BuiledQualityRS.fieldByName(''+Quality);
											BuildDifficulty=BuiledDiffRS.fieldByName('DefaultValue');
											BuiledQualityRS.close();
											KitchenCost=KitchenArea*(BuiledQuality*[BuildDifficulty/100]);
												
											}
											else
											if(RoomCategoryID == 4)
											{
												
												//Ti.API.info('RoomSubCategoryAreaM2 :'+RoomSubCategoryAreaM2 +'RoomQuantity :'+RoomQuantity)
												
												BathroomsArea=BathroomsArea+(RoomSubCategoryAreaM2*RoomQuantity);
												
											var BuiledQualityRS=DBFeaso.execute('select '+Quality+' from BuildQuality where BuildQualityID=1 and IsDeleted=0');
											BuiledQuality=BuiledQualityRS.fieldByName(''+Quality);
				
											
											BuildDifficulty=BuiledDiffRS.fieldByName('DefaultValue');
											BuiledQualityRS.close();
											BathroomCost=BathroomsArea*(BuiledQuality*[BuildDifficulty/100]);
											
											}
											else
											if(RoomCategoryID == 5)
											{
												DeckArea=DeckArea+(RoomSubCategoryAreaM2*RoomQuantity);
											var BuiledQualityRS=DBFeaso.execute('select '+Quality+' from BuildQuality where BuildQualityID=2 and IsDeleted=0');
											BuiledQuality=BuiledQualityRS.fieldByName(''+Quality);
											BuildDifficulty=BuiledDiffRS.fieldByName('DefaultValue');
											BuiledQualityRS.close();
											DecksCost=DeckArea*(BuiledQuality*[BuildDifficulty/100]);
											}
											else
											{//if(RoomCategoryID == 6)
												GarageArea=GarageArea+RoomSubCategoryAreaM2*RoomQuantity;
											var BuiledQualityRS=DBFeaso.execute('select '+Quality+' from BuildQuality where BuildQualityID=3 and IsDeleted=0');
											BuiledQuality=BuiledQualityRS.fieldByName(''+Quality);
											
											BuildDifficulty=BuiledDiffRS.fieldByName('DefaultValue');
											BuiledQualityRS.close();
											GaragesCost=GarageArea*(BuiledQuality*[BuildDifficulty/100]);
											}
											
											   SubCategoryResult.next();
											   }
										SubCategoryResult.close();	
								
									
									RoomCategoryIDresultset.next();
								}
						Quantity.close();
				 		RoomCategoryIDresultset.close();
				 			BuiledDiffRS.close();	
				 			
				 		//Ti.API.info('InternalRoomArea :'+InternalRoomAreaWithPercentAllowance+':KitchenArea :'+KitchenArea+':BathroomsArea: '+BathroomsArea);	
				 			
				 		var TotalLivingArea=InternalRoomAreaWithPercentAllowance+KitchenArea+BathroomsArea;
				 		var TotalConstructionArea=TotalLivingArea+DeckArea+GarageArea;
				 		
				 		var SummaryRS=DBFeaso.execute("select r.RoomSubCategotyID,r.name,d.dwellingquantity from DwellingDetails d, RoomSubsCategory r where d.RoomSubCategotyID=r.RoomSubCategotyID and d.DwellingID =? and d.dwellingquantity > 0",DwellingID);		
				 		var detailedSummary='';
				 		while(SummaryRS.isValidRow())
				 		{
				 			detailedSummary=detailedSummary.toString().concat(SummaryRS.fieldByName('DwellingQuantity').toString().concat(' * '+SummaryRS.fieldByName('Name').toString())+',') ;
				 			SummaryRS.next();
				 		}	
				 		SummaryRS.close();	
				 		//Ti.API.info('detailedSummary :'+detailedSummary.slice(0,-1));	
				 		
				 		//var Summary=NoOfBedRoom+' Bedroom,'+NoOfBathrooms+' Bathroom,'+NoOfCarParks+' Carpark,'+NoOfLoungeroom+' Lounge Room,'+NoOfDiningRoom+' Dining Room,'+
				 		//			NoOfFamillyRooms+' Family Room,'+NoOfRumPusRoom+'Rumpus Room,'+NoOfVerandah+' Verandah,'+NoOfBalcony+' Balcony';	
				 		
				 		Ti.API.info('BedRoom :'+NoOfBedRoom +' Kitchen : '+NoOfKitchen+' Bathroom : '+ NoOfBathrooms +' CarParks :'+NoOfCarParks );

				 		
				 		
				 		var TotalConstructionCostM2=InternalRoomCost+KitchenCost+BathroomCost+DecksCost+GaragesCost;
				 		
				 		//Ti.API.info('New TotalConstructionCostM2:'+TotalConstructionCostM2);
				 		var buildCostRS=DBFeaso.execute('select BuildQuality,BuildDifficulty from DwellingDetailsSummary where DwellingID=?',DwellingID);
				 		
				 		DBFeaso.execute('insert into TempDwellingDetailsSummary(DwellingID,TotalLivingAreaM2,TotalLivingAreaFt2,TotalConstructionAreaM2,TotalConstructionAreaFt2,TotalConstructionCostM2,TotalConstructionCostFt2,Summary,BuildQuality,BuildDifficulty,IsDeleted) values(?,?,?,?,?,?,?,?,?,?,?)',
				 														DwellingID,TotalLivingArea,0,TotalConstructionArea,0,TotalConstructionCostM2,0,detailedSummary.slice(0,-1),buildCostRS.fieldByName('BuildQuality'),buildCostRS.fieldByName('BuildDifficulty'),0);
				 		DwellingIDresultset.next();	
		 			}
		 			 
		 		DwellingIDresultset.close();
		 		
		 	}
 resultset.close();	
 DBFeaso.execute('COMMIT;');	
 	
  DBFeaso.close();
  
  
}	
	
