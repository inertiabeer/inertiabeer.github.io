function Begar(arr)
{
	if(arr.length<2)
	{
		return 0;
	}
	let teamNum=arr.length;//the num of teams 
	let lastTeam=arr.length;//the last team num
	if(arr.length%2!=0)
	{
		teamNum=teamNum+1;
		arr[lastTeam]=0;
	}
    let Round=teamNum-1;
    var n_Round=1;
    var tableList=[];
	let fight=teamNum/2;//every round fight table
	let step=teamNum<=4?1:(teamNum-4)/2+1;//确定步数
	var flag='left';//立一个flag
	for(;n_Round<=Round;n_Round++)
	{
		var table=[];
		for(var i=0;i<fight;i++)
		{
			var both=[arr[i],arr[arr.length-1-i]];
			table.push(both);
		}
		tableList.push(table);

		let temp=arr[0];
		arr[0]=arr[arr.length-1];
		arr[arr.length-1]=temp//swap the top 2


		if(flag=='left')// 0 or (max) to left
		{
			var newArr=[];
			newArr[0]=arr[0];
			for(var j=1;j<arr.length;j++)
			{
				if(j<=step)
				{
					newArr[j]=arr[arr.length-(step+1-j)];//当新数组需要获取的值在右侧时bega
				}
				else
				{
					
						newArr[j]=arr[j-step];
				}

				
			}

			arr=newArr;
			flag='right';


		}
		else//0 or max turn right
		{
			var newArr=[];
			newArr[arr.length-1]=arr[arr.length-1];

			for(var j=0;j<arr.length-1;j++)
			{
				if(j<step)
				{
					newArr[j]=arr[arr.length-(step+1-j)];
				}
				else
				{
					
						newArr[j]=arr[j-step];
				}

				
			}
			arr=newArr;
			flag='left';

		}

	}
return tableList;

};
