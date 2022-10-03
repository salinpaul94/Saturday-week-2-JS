function businessUser(businessName, hoursFree, acceptedPurpose) {
    // the three parameters above are properties of this object that are going to be used
    return {
        businessName,
        hoursFree,
        acceptedPurpose,
        pendingMeetings: [], // meetings yet to be approved by vk
        declinedMeetings: [], // mettings not approved by vk
        approvedMeetings: [], // meetings approved by vk
        canceledMeetings: [], // meetings already approved but later cancelled by vk
        feedback: '', // feedback to the booking user (user making the booking)

        getHoursFree:function hoursFree() {
            return this.hoursFree;
        },

        getFeedBack:function feedBack() {
            return this.feedback; // simply return a feedback.
        },

        newMeeting: function(meeting) {
            const { name, time, purpose } = meeting;

            if(this.hoursFree.indexOf(time) !== -1 && this.acceptedPurpose === 'any') {
                this.pendingMeetings.push(meeting);
                this.feedback = `${name}, your meeting was sent successfully. ${businessName} can now review and approve or decline`;
            } else {
                this.feedback = `${name}, this meeting is not suitable for ${businessName}`;
            }
        },

        approvedMeeting: function(id) {
            var previewingMeeting

            for(var i=0; i<this.pendingMeetings.length; i++){
                if(this.pendingMeetings[i]['id']==id)
                    previewingMeeting=this.pendingMeetings[i]
            }
            // approve previewing meeting and mark the previewingMeeting.time as a booked hour
            // note that approvedMeetings is the array while approveMeeting is the setter function
            this.approvedMeetings.push(previewingMeeting);
            hoursFree.splice(hoursFree.indexOf(previewingMeeting.time), 1);
            this.feedback = `${previewingMeeting.name}, your meeting has been approved, time of meeting: ${previewingMeeting.tme}`; 
        },

        declinedMeeting: function(id) {
            var previewingMeeting

            for(var i=0; i<this.pendingMeetings.length; i++) {
                if(this.pendingMeetings[i]['id']===id)
                    previewingMeeting=this.pendingMeetings[i]
            }
            // note that declinedMeetings is the array while declineMeeting is the setter function
            this.declinedMeetings.push(previewingMeeting);
            this.feedback = `${previewingMeeting.name}, your meeting was declined for resons best known to ${this.businessName}`
        },

        canceledMeeting: function(id) {
            // the meeting has to be approved first
            var previewingMeeting
            for(var i=0; i<this.approvedMeetings.length; i++) {
                if( this.approvedMeetings[i]['id']===id)
                    previewingMeeting=this.approvedMeetings[i]
            }
            this.hoursFree.push(previewingMeeting.time); // make the hour of the canceled meeting a free hour
            this.canceledMeetings.push(previewingMeeting); // add cancelled meeting to the array of cancelled meetings
            this.approvedMeetings.splice(previewingMeeting, 1); // remover cancelled meeting from approved meeting array
            this.feedback = `${previewingMeeting.name}, your meeting with ${businessName} scheduled at ${previewingMeeting.time} has
            been canceled with message "this meeting is not needed now`;
        },

        requestHourCancelation: function(hr) {
            if(this.hoursFree.indexOf(hr) !== -1) {
                this.hoursFree.splice(hoursFree.indexOf(hr), 1);
            }
        },
    };
}

// Program starts

const vk = businessUser('VK', [2,3,4,5,6,7,8,9], 'any');
console.log("Today's Free hour list")
console.log(vk.getHoursFree()) // free hour list

var meeting1 = {
    id: 1,
    name: 'Ujjawal',
    time: 8,
    purpose: 'any'
}
vk.newMeeting(meeting1) // Request a meeting
console.log(vk.getFeedBack())

var meeting2 = {
    id: 2,
    name: 'Sushant',
    time: 9,
    purpose: 'any'
}

vk.newMeeting(meeting2)
console.log(vk.getFeedBack())

// Approve a meeting from pending meetings
vk.approvedMeeting(1)
console.log(vk.getFeedBack())
console.log("See the update free hour list below")
console.log(vk.getHoursFree())

// decline meeting from pending meetings
vk.declinedMeeting(2)
console.log(vk.getFeedBack())

// cancle meeting from approved meeting
console.log("---------------------------Meeting cancellation-------------------");
vk.canceledMeeting(1)
console.log(vk.getFeedBack())
console.log("The cancelled meeting hour is added in the free hours. See the updated free list below")
console.log(vk.getHoursFree())

// remove free hour from todays list
// ck.requestHourCancellation(3)
// console.log(vk.getHoursFree())