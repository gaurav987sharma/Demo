'user strict';
var sql = require('../config/db.js');
var request = require('request');
var ticketdetails = function(ticketdetails){

};

ticketdetails.getAllTicketDetails = function (callback) {
    sql.query("SELECT b.ticket_type,b.disposition_name,b.sub_disposition_name,b.assigned_to_dept_name,b.assigned_to_user_name,b.priority_name,b.ticket_status,company_id,b.ticket_id,source,task_count,sla_time,docket_no,source_info,person_name,person_flds_show,merge_ticket_count,split_ticket_count,ticket_status,created_on,created_on_unix,ticket_assigned_time,IF((ticket_status_id='2'),modified_on,'---') as closed_on,created_by,action_taken,ticket_type,ticket_status_id FROM ticket_details_report as b FORCE INDEX(created_on_unix) WHERE 1  AND merge_flag='0' and dummy_mail_ticket=1 AND split_flag=0  AND ( 1=1 )  ORDER BY b.ticket_id DESC", function (err, res) {             
            if(err) {
                console.log("error: ", err);
                callback(err, null);
            }
            else{
                callback(null, res);
            }
        });   
};

ticketdetails.addTicketDetails = async function(req,callback) {

   let client_key ='1179006730781065216';
   var k = {"module_name_ajax":"create_ticket","reqType":"createTicket","person_id":req.body.person_id,"person_name":req.body.person_name,"agent_id":req.body.agent_id,"agent_name":req.body.agent_name,"source_info":req.body.source_info,"source":req.body.source,"intera_source":req.body.intera_source,"problem_reported":req.body.problem_reported,"agent_remarks":req.body.agent_remarks,"created_by":req.body.created_by,"created_by_id":req.body.created_by_id,"assigned_to_user_id":req.body.assigned_to_user_id,"assigned_by":req.body.assigned_by,"assigned_to_dept_id":req.body.assigned_to_dept_id,"call_type_source":req.body.call_type_source,"call_agent_name":req.body.call_agent_name,"call_agent_id":req.call_agent_id,"discard_reason":req.body.discard_reason,"call_phone_no":req.body.call_phone_no,"uuid":req.body.uuid,"cuid":req.body.cuid,"parentapp":req.body.parentapp,"omni_not_added":req.omni_not_added,"key":client_key,"CLIENT_ID":req.body.CLIENT_ID,"CLIENT_FOLDER":req.body.CLIENT_FOLDER,"first_name":req.body.first_name,"last_name":req.body.last_name,"person_mail":req.body.person_mail,"mobile_no":req.body.mobile_no,"phone1":req.body.phone1,"dob":req.body.dob,"country_name":req.body.country_name,"state_name":req.body.state_name,"city_name":req.body.city_name,"ticket_type":req.body.ticket_type,"disposition":req.body.disposition,"sub_disposition":req.body.sub_disposition,"dept_name":req.body.dept_name,"user_name":req.body.user_name,"priority_name":req.body.priority,"ticket_status":req.body.ticket_status,"modified_by":req.body.modified_by,"user_source_app":req.body.user_source_app,"source_app":req.body.source_app,"user_id1":req.body.user_id1};
   var k = JSON.stringify(k);
    url='https://172.16.3.46/CZCRM/api/request_manager.php?postData='+k;
    request(url, { json: true , "rejectUnauthorized": false}, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body);
    callback(body);
    });
};

ticketdetails.editTicketDetails = async function(req,callback) {
    var k = {"reqType":"updateTickets","ticket_id":req.body.ticket_id,"ticket_type":req.body.ticket_type,"disposition_id":req.body.disposition_id,"sub_disposition_id":req.body.sub_disposition_id,"priority_id":req.body.priority_id,"ticket_status_id":req.body.ticket_status_id,"action_taken":req.body.action_taken,"agent_remarks":req.body.agent_remarks,"modified_by":req.body.modified_by,"modified_by_id":req.body.modified_by_id,"modified_by_dept_id":req.body.modified_by_dept_id,"key":req.body.key,"update_type":'multiple_value_update',"previous_ticket_status":req.body.previous_ticket_status,"user_id1":req.body.user_id1};
    var k = JSON.stringify(k);
     url='https://172.16.3.46/CZCRM/api/request_manager.php?postData='+k;
     request(url, { json: true , "rejectUnauthorized": false}, (err, res, body) => {
     if (err) { return console.log(err); }
     console.log(body);
     callback(body);
     }); 
};
function clean(obj,opt) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        delete obj[propName];
      }
    }
    return obj;
}
/**ticketdetails.getTicketDetails = function(id,callback){
    var result = {};
    $querysql = "select a.ticket_status_id,a.docket_no,v.mobile_no,v.designation,a.person_name,a.priority_name,a.disposition_id,a.sub_disposition_id,a.disposition_name,a.sub_disposition_name,a.ticket_status,alternatePhNo,alternatePerson,a.created_on,time(a.created_on) as creation_time,time_format(timediff(NOW(),a.created_on),'%Hh %im') as time_elapsed,last_escalated_on,ticket_assigned_time,a.modified_on,a.created_by,a.created_by_id,a.assigned_to_user_id,assigned_to_dept_id,problem_reported,action_taken,assigned_to_dept_name as dept_name,assigned_to_user_name as user_name,assigned_user_first_name as first_name,a.agent_remarks,a.caller_remarks,ticket_assigned_remarks,a.priority_id,a.source_info,a.source,a.loc_id,a.person_id,a.source,a.ticket_type_id,a.ticket_type,a.priority_name,assigned_user_first_name as first_name from ticket_details_report as a left join person_info as v on a.person_id = v.person_id where a.ticket_id=? ; SELECT a.history_id,a.ticket_id,b.ticket_status,b.ticket_status_id,change_code,change_value,remark,customer_reply,interaction_type,interaction_entity,if(interaction_type='email',interaction_asset,'') as interaction_asset_email,change_by,change_on,TIMEDIFF(a.change_on,b.created_on) as ticket_age,interaction_asset,feedback_internal_history,ticket_status_history,a.voice_file,a.call_session_id,a.call_agent_id,a.call_telephony_url,a.protocol FROM ticket_history as a left join  ticket_details_report AS b on b.ticket_id=a.ticket_id  WHERE 1  AND a.ticket_id=? order by history_id desc"
    sql.query($querysql, [id,id] ,function(err,res,fields){
        if(err){
            console.log("error:", err);
            callback(err,null);
        }else{
            result['ticketDetails']=res[0];
            result['mailHistory']=res[1];
             callback(null, result);
        }
    })
}*/

ticketdetails.getTicketDetails = function(id,callback){
    var result = {};
    $querysql = "select a.ticket_status_id,a.docket_no,v.mobile_no,v.designation,a.person_name,a.priority_name,a.disposition_id,a.sub_disposition_id,a.disposition_name,a.sub_disposition_name,a.ticket_status,alternatePhNo,alternatePerson,a.created_on,time(a.created_on) as creation_time,time_format(timediff(NOW(),a.created_on),'%Hh %im') as time_elapsed,last_escalated_on,ticket_assigned_time,a.modified_on,a.created_by,a.created_by_id,a.assigned_to_user_id,assigned_to_dept_id,problem_reported,action_taken,assigned_to_dept_name as dept_name,assigned_to_user_name as user_name,assigned_user_first_name as first_name,a.agent_remarks,a.caller_remarks,ticket_assigned_remarks,a.priority_id,a.source_info,a.source,a.loc_id,a.person_id,a.source,a.ticket_type_id,a.ticket_type,a.priority_name,assigned_user_first_name as first_name from ticket_details_report as a left join person_info as v on a.person_id = v.person_id where a.docket_no=?";
    sql.query($querysql, [id] ,function(err,res,fields){
        if(err){
            console.log("error:", err);
            callback(err,null);
        }else{
            callback(null, res);
        }
    })
}

ticketdetails.getTicketHistory = function(id,callback){
    var result = {};
    $querysql = "SELECT a.history_id,b.docket_no,b.ticket_status,b.ticket_status_id,change_code,change_value,remark,customer_reply,interaction_type,interaction_entity,if(interaction_type='email',interaction_asset,'') as interaction_asset_email,change_by,change_on,TIMEDIFF(a.change_on,b.created_on) as ticket_age,interaction_asset,feedback_internal_history,ticket_status_history,a.voice_file,a.call_session_id,a.call_agent_id,a.call_telephony_url,a.protocol FROM ticket_details_report as b join ticket_history AS a on a.ticket_id=b.ticket_id  WHERE 1  AND b.docket_no=? order by history_id desc";
    sql.query($querysql, [id] ,function(err,res,fields){
        if(err){
            console.log("error:", err);
            callback(err,null);
        }else{
            callback(null, res);
        }
    })
}

ticketdetails.getMailHistory = function(id,callback){
    var result = {};
    $querysql = "SELECT a.mail_id,label,mail_to,mail_from,subject,group_concat(b.file_name) as attachments,has_attachment,if(DATE_FORMAT(mail_date,'%Y-%m-%d %H:%i:%s')='0000-00-00 00:00:00',DATE_FORMAT(reply_on,'%Y-%m-%d %H:%i:%s'),DATE_FORMAT(mail_date,'%Y-%m-%d %H:%i:%s')) as date,DATE_FORMAT(downloading_datetime,'%Y-%m-%d %H:%i:%s') as downloading_timedate,unread,flow,a.docket_no,source,flag,c.ticket_status,label_color,ack_state,bounce_cust_email,body_text,docket_no_type,assigned_to_user_name as user_name,assigned_to_dept_name as dept_name,mail_flag,service_type,a.ticket_id,reply_by,h.user_name as assign_mail_agent,assign_flag FROM mail as a left join mail_attachment as b on a.mail_id=b.mail_id left join  ticket_details_report as c on a.ticket_id=c.ticket_id left join mail_server_conf as d on a.mail_in_addr=d.username left join mail_body as e on a.mail_id=e.mail_id  LEFT JOIN users as h ON a.assign_to_users = h.user_id  WHERE 1  AND c.docket_no = ? AND a.ticket_type='T' and processed=1 and mail_merge_fleg='0' GROUP BY a.mail_id order by mail_id desc";
    sql.query($querysql, [id] ,function(err,res,fields){
        if(err){
            console.log("error:", err);
            callback(err,null);
        }else{
            callback(null, res);
        }
    })
}

ticketdetails.getTicketField = function (callback){
	console.log("====fetching fields========");
    let result ={};
    $query = "select field_name,field_label,field_type,default_value,sequence,field_mandatory from basic_form_fields where form_id=2 and delete_flag=0 order by sequence asc;select field_name,field_label,field_type,default_value,sequence,field_mandatory from customized_form_fields where form_id=2 and delete_flag=0 order by sequence asc";
    sql.query($query,function(err,res){
        if(err){
            console.log("error:", err);
            callback(err,null);
        }else{
			console.log("=====field fetch array======");
            result['BasicField'] = res[0];
            result['CustField'] = res[1];
            callback(null, result);
        }
    })
}



module.exports= ticketdetails;


