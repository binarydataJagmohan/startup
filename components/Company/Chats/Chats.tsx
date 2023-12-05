import React, { useState, useEffect, useRef } from "react";
import { getCurrentUserData } from "../../../lib/session";
//import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getAllUserData, SendMessageToUserByAdmin, CreateGroupChatByAdmin } from "../../../lib/adminapi";
import { getStartupMessageData, getClickStartupUserChatData, ContactUserByStartup, ContactUserByStartupWithShareFile, getAdminDataStartup } from "../../../lib/companyapi";
import { ToastContainer, toast } from "react-toastify";
import moment from 'moment';
import PopupModalTwo from '../../commoncomponents/PopupModal';
import PopupModalLarge from '../../commoncomponents/PopupModalLarge';
import { useRouter } from "next/router";
import Image from "next/image";
import { AnyPtrRecord } from "dns";
export default function Chats(props: any) {
  let id = props.UserId;

  const [adminchatsidebar, setAdminChatSiderBar] = useState<AdminSideBarChatMessages[]>([]);

  const [adminuserchefmesage, setAdminChatMessage] = useState<AdninChatMessages[]>([]);
  const [message, setMessage] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [activeChat, setActiveChat] = useState(-1);

  const [activeButton, setActiveButton] = useState('desc');

  const ChatSortBy = useRef('desc');

  const [searchInputValue, setSearchInputValue] = useState("");

  const [searchResultsVisible, setSearchResultsVisible] = useState(true);

  const [userdata, setUserData] = useState<UserData>({
    id: '',
    name: '',
    email: '',
    surname: '',
    role: ''
  });

  const [admindata, setAdminData] = useState<AdminData>({
    id: '',
    name: '',
    email: '',
    surname: '',
    role: '',
    pic: ''
  });

  const [modalConfirmTwo, setModalConfirmTwo] = useState(false);

  const [chatmessage, setChatMessage] = useState('');

  const [searchuserid, setSearchUserId] = useState('');

  const [modalConfirm, setModalConfirm] = useState(false);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [Uploadimage, setUploadImage] = useState('');
  const [previewimage, setPreviewimage] = useState('');
  const [groupname, setGroupName] = useState("");
  const [groupmessage, setGroupMessage] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  const ChatSortTypeBy = useRef('first');

  const modalConfirmCloseTwo = () => {
    setSearchInputValue("");
    setModalConfirmTwo(false);

  };

  const modalConfirmClose = () => {
    setModalConfirm(false);
  };


  const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
    id: "",
    name: "",
    email: "",
    pic: null,
    surname: "",
    role: "",
    approved_by_admin: "",
  });

  interface CurrentUserData {
    id: string;
    name: string;
    email: string;
    pic: string | null;
    surname: string;
    role: string;
    approved_by_admin: string;
  }

  interface UserData {
    id: string;
    name: string;
    email: string;
    surname: string;
    role: string;
  }

  interface AdminData {
    id: string;
    name: string;
    email: string;
    surname: string;
    role: string;
    pic: string
  }

  interface AdminSideBarChatMessages {
    sender_id?: string;
    receiver_id?: string;
    name?: string;
    profile_pic?: string;
    sender_name?: string;
    unreadcount?: string;
    latest_message: string;
    latest_created_at: string;
    timezone: string;
    latest_type?: string;
    is_online?: string;
    latest_chat_type?: string;
    sender_pic?: string;
    group_image?: string;
    group_name?: string;
    recevier_pic?: string
    receiver_name?: string
    sender_role?: string
    chat_type?: string
    group_id?: string
    single_chat_id?: string;

  }

  interface AdninChatMessages {
    sender_id: number;
    receiver_id?: number;
    sender_name: string;
    receiver_name?: string;
    sender_pic?: string;
    receiver_pic?: string;
    sender_role?: string;
    receiver_role?: string;
    message?: string;
    message_attachment?: string;
    booking_id?: number;
    chatdate?: string;
    type?: string;
    bookig_send_by?: string;
    created_by?: string;
    created_by_id?: number;
    created_by_pic?: string;
    created_by_role?: string;
    message_attachment_type?: string;
  }


  interface Errors {
    message?: string;
    chatmessage?: string;
    groupmessage?: string;
    groupname?: string;
    groupmember?: string;
  }

  interface ChatGroupMember {
    name?: string;
    profile_pic?: string;
    role?: string;
    user_id?: string;
    group_admin_id?: string;

  }

  const [errors, setErrors] = useState<Errors>({});
  const [chatgroupmember, setChatGroupMember] = useState<ChatGroupMember[]>([]);

  const [chat_type, setCurrentChatType] = useState("");
  const [chat_receiver_id, setChatReceiverId] = useState("");
  const [chat_sender_id, setChatSenderId] = useState("");
  const [chat_group_id, setChatGroupId] = useState("");
  const [chat_single_chat_id, setChatSingleChatId] = useState("");
  const [chat_group_name, setChatGroupName] = useState("");
  const [chat_single_name, setChatSingleChatName] = useState("");

  const latestChatTypeRef = useRef(null);
  const singleChatIdRef = useRef(null);
  const groupIdRef = useRef(null);
  const SenderIdRef = useRef(null);

  const newsingleChatIdRef = useRef(null);
  const newgroupIdRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    const userData = getCurrentUserData() as CurrentUserData;
    if (userData.role !== 'startup') {
      router.back();
    }
    fetchUserMessageDetails(userData.id);
    fetchAllUserData();
    fetchAdminData();
    setCurrentUserData({
      ...userData,
      id: userData.id,
      name: userData.name,
      pic: userData.pic,
      surname: userData.surname,
      role: userData.role,
      approved_by_admin: userData.approved_by_admin,
    });
  });
  useEffect(() => {
    // const data = isPageVisibleToRole("chef");
    // if (data == 2) {
    //   window.location.href = "/login"; // redirect to login if not logged in
    // } else if (data == 0) {
    //   window.location.href = "/404"; // redirect to 404 if not authorized
    // }
    //if (data == 1) {
    const userData = getCurrentUserData() as CurrentUserData;
    fetchUserMessageDetails(userData.id);
    fetchAllUserData();
    fetchAdminData();
    setCurrentUserData({
      ...userData,
      id: userData.id,
      name: userData.name,
      pic: userData.pic,
      surname: userData.surname,
      role: userData.role,
      approved_by_admin: userData.approved_by_admin,
    });

    const fetchData = async () => {
      const data = {
        latest_chat_type: latestChatTypeRef.current,
        single_chat_id: singleChatIdRef.current,
        group_id: groupIdRef.current,
        id: userData.id,
        sender_id: SenderIdRef.current,
        sort: ChatSortBy.current,
        chat_sort_type: ChatSortTypeBy.current
      };
      getClickStartupUserChatData(data)
        .then(res => {
          if (res.status == true) {
            setAdminChatSiderBar(res.userchatsider);
            setAdminChatMessage(res.userchatdata);
            setChatGroupMember(res.chat_member);
            if (ChatSortTypeBy.current == 'first') {
              setCurrentChatType(res.userchatsider[0].latest_chat_type);
              setChatReceiverId(res.userchatsider[0].sender_id);
              setChatSenderId(res.userchatsider[0].receiver_id);
              setChatGroupId(res.userchatsider[0].group_id);
              setChatSingleChatId(res.userchatsider[0].single_chat_id);
              newsingleChatIdRef.current = res.userchatsider[0].single_chat_id;
              newgroupIdRef.current = res.userchatsider[0].group_id;

              if (res.userchatsider[0].latest_chat_type == 'group') {
                setChatGroupName(res.userchatsider[0].group_name);
              } else {
                setChatGroupName("");
              }

              if (res.userchatsider[0].latest_chat_type == 'single') {

                if (res.userchatsider[0].sender_id != currentUserData.id) {
                  setChatSingleChatName(res.userchatsider[0].sender_name);
                }

                if (res.userchatsider[0].receiver_id != currentUserData.id) {
                  setChatSingleChatName(res.userchatsider[0].sender_name);
                }

              } else {
                setChatSingleChatName("");
              }
            }
            if (ChatSortTypeBy.current == 'second') {

              if (res.userchatsider[0].latest_chat_type == 'single') {

                if (res.userchatsider[0].single_chat_id != newsingleChatIdRef.current) {
                  ChatSortTypeBy.current = "first";
                }
                console.log(res.userchatsider[0].single_chat_id + 'c_s');
                console.log(newsingleChatIdRef.current + 'a_s');
              }
              if (res.userchatsider[0].latest_chat_type == 'group') {

                if (res.userchatsider[0].group_id != newgroupIdRef.current) {
                  ChatSortTypeBy.current = "first";

                }

                console.log(res.userchatsider[0].group_id + 'c_g');
                console.log(newgroupIdRef.current + 'a_g');

              }
            }
          } else {
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              closeButton: true,
              hideProgressBar: false,
              style: {
                background: '#ffff',
                borderLeft: '4px solid #e74c3c',
                color: '#454545',
              },
              progressStyle: {
                background: '#ffff',
              },
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    const interval = setInterval(fetchData, 2000);
    return () => {
      clearInterval(interval);
    };

    //}

  }, []);



  const fetchUserMessageDetails = async (id: any) => {
    try {
      const data = {
        id: id,
      };
      const res = await getStartupMessageData(data);
      if (res.status == true) {
        setActiveChat(0);
        setAdminChatSiderBar(res.userchatsider);
        setAdminChatMessage(res.userchatdata);
        setChatGroupMember(res.chat_member);
        setCurrentChatType(res.userchatsider[0].latest_chat_type);
        setChatReceiverId(res.userchatsider[0].sender_id);
        setChatSenderId(res.userchatsider[0].receiver_id);
        setChatGroupId(res.userchatsider[0].group_id);
        setChatSingleChatId(res.userchatsider[0].single_chat_id);

        if (res.userchatsider[0].latest_chat_type == 'group') {
          setChatGroupName(res.userchatsider[0].group_name);
        } else {
          setChatGroupName("");
        }

        if (res.userchatsider[0].latest_chat_type == 'single') {
          if (res.userchatsider[0].sender_id != id) {
            setChatSingleChatName(res.userchatsider[0].sender_name);
          }
          if (res.userchatsider[0].receiver_id != id) {
            setChatSingleChatName(res.userchatsider[0].receiver_name);
          }
        } else {
          setChatSingleChatName("");
        }
        latestChatTypeRef.current = res.userchatsider[0].latest_chat_type;
        singleChatIdRef.current = res.userchatsider[0].single_chat_id;
        groupIdRef.current = res.userchatsider[0].group_id;
        SenderIdRef.current = res.userchatsider[0].sender_id;
        newsingleChatIdRef.current = res.userchatsider[0].single_chat_id;
        newgroupIdRef.current = res.userchatsider[0].group_id;
        setIsFormSubmitted(true);
      } else {
        // toast.error(res.message, {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      }
    } catch (err: any) {
      // toast.error(err.message, {
      //   position: toast.POSITION.BOTTOM_RIGHT,
      // });
    }
  };


  const fetchAdminData = async () => {

    try {
      const res = await getAdminDataStartup();
      if (res.status) {
        // console.log(res.data);
        setAdminData(res.data);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: true,
          hideProgressBar: false,
          style: {
            background: '#ffff',
            borderLeft: '4px solid #e74c3c',
            color: '#454545',
          },
          progressStyle: {
            background: '#ffff',
          },
        });
      }
    } catch (err) {
      toast.error((err as Error).message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        closeButton: true,
        hideProgressBar: false,
        style: {
          background: '#ffff',
          borderLeft: '4px solid #e74c3c',
          color: '#454545',
        },
        progressStyle: {
          background: '#ffff',
        },
      });
    }
  };


  const fetchAllUserData = async () => {

    try {
      const res = await getAllUserData();
      if (res.status) {
        setUserData(res.data);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: true,
          hideProgressBar: false,
          style: {
            background: '#ffff',
            borderLeft: '4px solid #e74c3c',
            color: '#454545',
          },
          progressStyle: {
            background: '#ffff',
          },
        });
      }
    } catch (err) {
      toast.error((err as Error).message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        closeButton: true,
        hideProgressBar: false,
        style: {
          background: '#ffff',
          borderLeft: '4px solid #e74c3c',
          color: '#454545',
        },
        progressStyle: {
          background: '#ffff',
        },
      });
    }
  };

  const handleRegisterBlur = (event: any) => {
    const { name, value } = event.target;
    const newErrors = { ...errors };
    switch (name) {
      case "name":
        if (!value) {
          newErrors.message = "Name is required";
        } else {
          delete newErrors.message;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleBookingAssignJobSubmit = (event: any) => {
    event.preventDefault();

    const newErrors: Errors = {};

    if (!message) {
      newErrors.message = "Message can't be blank";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      const data = {
        message: message,
        chat_type: chat_type,
        receiver_id: chat_receiver_id,
        sender_id: chat_sender_id,
        user_id: currentUserData.id,
        group_id: chat_group_id,
        single_chat_id: chat_single_chat_id,
      };

      // console.log(data);


      ContactUserByStartup(data)
        .then(res => {
          if (res.status == true) {
            setMessage("");
            fetchUserMessageDetails(currentUserData.id);
            setIsFormSubmitted(true);
            setActiveButton('desc');
            ChatSortBy.current = 'desc';
          } else {

            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              closeButton: true,
              hideProgressBar: false,
              style: {
                background: '#ffff',
                borderLeft: '4px solid #e74c3c',
                color: '#454545',
              },
              progressStyle: {
                background: '#ffff',
              },
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

  };

  const handleButtonClick = (index: number, chat_type: any, sender_id: any, receiver_id: any, user_id: any, group_id: any, group_name: any, single_chat_id: any, sender_name: any, receiver_name: any) => {


    setActiveChat(index);

    setChatReceiverId(sender_id);
    setChatSenderId(receiver_id);
    setChatGroupId(group_id);
    setChatSingleChatId(single_chat_id);
    setCurrentChatType(chat_type);
    setChatGroupName(group_name);

    latestChatTypeRef.current = chat_type;
    singleChatIdRef.current = single_chat_id;
    groupIdRef.current = group_id;
    SenderIdRef.current = sender_id;
    ChatSortTypeBy.current = 'second';

    const data = {
      latest_chat_type: chat_type,
      single_chat_id: single_chat_id,
      group_id: group_id,
      id: user_id,
      index: index,
      sender_id: sender_id,
      sort: ChatSortBy.current,
      chat_sort_type: 'second'
    };

    getClickStartupUserChatData(data)
      .then(res => {
        if (res.status == true) {

          setAdminChatSiderBar(res.userchatsider);
          setAdminChatMessage(res.userchatdata);
          setChatGroupMember(res.chat_member);

          if (chat_type == 'group') {
            setChatGroupName(group_name);
          } else {
            setChatGroupName("");
          }
          if (chat_type == 'single') {
            if (sender_id != currentUserData.id) {
              setChatSingleChatName(sender_name);
            }

            if (receiver_id != currentUserData.id) {
              setChatSingleChatName(receiver_name);
            }


          } else {
            setChatSingleChatName("");
          }

          setIsFormSubmitted(true);


        } else {

          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            closeButton: true,
            hideProgressBar: false,
            style: {
              background: '#ffff',
              borderLeft: '4px solid #e74c3c',
              color: '#454545',
            },
            progressStyle: {
              background: '#ffff',
            },
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const userMessRef = useRef<HTMLUListElement>(null);

  const scrollToBottom = () => {
    if (userMessRef.current) {
      const userMessElement = userMessRef.current;
      userMessElement.scrollTop = userMessElement.scrollHeight - userMessElement.clientHeight;
    }
  };

  useEffect(() => {
    if (isFormSubmitted) {
      // const messages_chat_section = document.getElementById('messages_chat_section');
      // let shouldScroll = 0;
      // if (messages_chat_section) {
      //     let shouldScroll = messages_chat_section.scrollTop + messages_chat_section.clientHeight === messages_chat_section.scrollHeight;
      // }
      // if (!shouldScroll) {
      //     if (messages_chat_section) {
      //         messages_chat_section.scrollTop = messages_chat_section.scrollHeight;
      //     }
      // }
      scrollToBottom();
      setIsFormSubmitted(false);
    }
  }, [isFormSubmitted]);

  const formatDate = (value: any) => {
    return moment(value).format('D/M/YYYY HH:mm');
  }

  const imageChange = async (e: any) => {
    const file = e.target.files[0];
    // Check file type
    const fileType = file.type;
    let formData = new FormData();

    if (fileType.startsWith('image/')) {
      // Image file
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        // Invalid image extension
        // console.log('Invalid image extension. Allowed extensions are: jpg, jpeg, png');
        toast.info('Invalid image extension. Allowed extensions are: jpg, jpeg, png', {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: true,
          hideProgressBar: false,
          style: {
            background: '#ffff',
            borderLeft: '4px solid #e74c3c',
            color: '#454545',
          },
          progressStyle: {
            background: '#ffff',
          },
        });
        return;
      }
      if (file.size > 200 * 1024) {
        // Image size exceeds 200KB
        console.log('Image size should be less than or equal to 200KB');
        toast.info('Image size should be less than or equal to 200KB', {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: true,
          hideProgressBar: false,
          style: {
            background: '#ffff',
            borderLeft: '4px solid #e74c3c',
            color: '#454545',
          },
          progressStyle: {
            background: '#ffff',
          },
        });
        return;
      }
      formData.append('type', 'image');
    } else if (fileType === 'application/pdf') {
      // PDF file
      if (file.size > 1024 * 1024) {
        // PDF size exceeds 1MB
        // console.log('PDF size should be less than or equal to 1MB');
        toast.info('PDF size should be less than or equal to 1MB', {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: true,
          hideProgressBar: false,
          style: {
            background: '#ffff',
            borderLeft: '4px solid #e74c3c',
            color: '#454545',
          },
          progressStyle: {
            background: '#ffff',
          },
        });
        return;
      }
      formData.append('type', 'pdf');
    } else if (fileType === 'video/mp4') {
      // MP4 video file
      if (file.size > 2 * 1024 * 1024) {
        // Video size exceeds 1MB
        console.log('Video size should be less than or equal to 1MB');
        toast.info('Video size should be less than or equal to 2MB', {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: true,
          hideProgressBar: false,
          style: {
            background: '#ffff',
            borderLeft: '4px solid #e74c3c',
            color: '#454545',
          },
          progressStyle: {
            background: '#ffff',
          },
        });
        return;
      }
      formData.append('type', 'video');
    } else {
      // Invalid file type
      // console.log('Invalid file type');
      toast.info('Invalid file type', {
        position: toast.POSITION.TOP_RIGHT,
        closeButton: true,
        hideProgressBar: false,
        style: {
          background: '#ffff',
          borderLeft: '4px solid #e74c3c',
          color: '#454545',
        },
        progressStyle: {
          background: '#ffff',
        },
      });
      return;
    }

    formData.append('data', file);
    formData.append('chat_type', chat_type);
    formData.append('receiver_id', chat_receiver_id);
    formData.append('sender_id', chat_sender_id);
    formData.append('user_id', currentUserData.id);
    formData.append('group_id', chat_group_id);
    formData.append('single_chat_id', chat_single_chat_id);

    ContactUserByStartupWithShareFile(formData)
      .then(res => {
        if (res.status === true) {
          setMessage('');
          fetchUserMessageDetails(currentUserData.id);
          setIsFormSubmitted(true);
          setActiveButton('desc');
          ChatSortBy.current = 'desc';
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            closeButton: true,
            hideProgressBar: false,
            style: {
              background: '#ffff',
              borderLeft: '4px solid #e74c3c',
              color: '#454545',
            },
            progressStyle: {
              background: '#ffff',
            },
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleFilterButtonClick = (buttonName: any) => {
    setActiveButton(buttonName);
    setActiveChat(0);
    ChatSortBy.current = buttonName;
    ChatSortTypeBy.current = 'first';
    // handleButtonClick(0,receiver_id,booking_id);
    // Additional logic or actions you want to perform
  };

  function handleSearchInputChange(event: any) {
    setSearchInputValue(event.target.value.trim());
    setSearchResultsVisible(true);
  }

  function renderSearchResults() {
    const query = searchInputValue.toLowerCase();
    const matchingData = Object.values(userdata)
      .filter((user) => {
        const fullName = `${user.name} ${user.surname}`.toLowerCase();
        return fullName.includes(query);
      });

    return (
      <div className="mb-4" id="new_search-results" style={{ height: Object.keys(matchingData).length > 0 ? '' : 'auto', display: searchResultsVisible ? 'block' : 'none' }}>
        <ul>
          {matchingData.length > 0 ? (
            matchingData.map((user) => (
              <li key={user.id} onClick={() => addItem(user.id, `${user.name} ${user.surname}`)} role="button">
                {`${user.name} ${user.surname}`}
              </li>
            ))
          ) : (
            <li>
              No records found
            </li>
          )}
        </ul>
      </div>
    );
  }

  function addItem(id: any, name: any) {
    setSearchUserId(id);
    setSearchInputValue(name)
    setSearchResultsVisible(false)
    setModalConfirmTwo(true);
    setChatMessage('');
  }
  const handlMessageSubmit = (event: any) => {
    event.preventDefault();
    // Validate form data
    const newErrors: Errors = {};
    if (!chatmessage) {
      newErrors.chatmessage = "Message is required";
    }
    setErrors(newErrors);
    // Submit form data if there are no errors
    if (Object.keys(newErrors).length === 0) {
      const data = {
        message: chatmessage,
        sender_id: currentUserData.id,
        receiver_id: searchuserid,
        single_chat_id: currentUserData.id + searchuserid,
        chat_type: 'single'
      };
      SendMessageToUserByAdmin(data)
        .then(res => {
          if (res.status == true) {
            setSearchInputValue('')
            setModalConfirmTwo(false);
            fetchUserMessageDetails(currentUserData.id);
          } else {
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              closeButton: true,
              hideProgressBar: false,
              style: {
                background: '#ffff',
                borderLeft: '4px solid #e74c3c',
                color: '#454545',
              },
              progressStyle: {
                background: '#ffff',
              },
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  const handleMessageBlur = (event: any) => {
    const { name, value } = event.target;
    const newErrors = { ...errors };
    switch (name) {
      case "chatmessage":
        if (!value) {
          newErrors.chatmessage = "Messge is required";
        } else {
          delete newErrors.chatmessage;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
    console.log(name);
  };

  const creategroupchat = () => {
    setModalConfirm(true);
    setGroupName('');
    setGroupMessage('')
    setSelectedMembers([]);
  };

  //menu submit start
  const handlGroupSubmit = (event: any) => {
    event.preventDefault();
    const groupmember = selectedMembers.join(",")
    // Validate form data
    const newErrors: Errors = {};
    if (!groupname) {
      newErrors.groupname = "Group Name is required";
    }
    if (!groupmessage) {
      newErrors.groupmessage = "Message is required";
    }
    if (!groupmember) {
      newErrors.groupmember = "Please select alteast one member";
    }
    setErrors(newErrors);
    // Submit form data if there are no errors
    if (Object.keys(errors).length === 0) {

      const data = {
        group_name: groupname,
        group_admin_id: currentUserData.id,
        member_id: groupmember,
        chat_type: 'group',
        message: groupmessage

      };
      CreateGroupChatByAdmin(data, Uploadimage[0])
        .then(res => {
          if (res.status == true) {
            setModalConfirm(false);
            fetchUserMessageDetails(currentUserData.id);
            toast.success(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              closeButton: true,
              hideProgressBar: false,
              style: {
                background: '#ffff',
                borderLeft: '4px solid #ff4e00d1',
                color: '#454545'
              },
              progressStyle: {
                background: '#ffff',
              },
            });

          } else {

            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              closeButton: true,
              hideProgressBar: false,
              style: {
                background: '#ffff',
                borderLeft: '4px solid #e74c3c',
                color: '#454545',
              },
              progressStyle: {
                background: '#ffff',
              },
            });

          }
        })
        .catch(err => {
          console.log(err);
        });
    }

  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUploadImage(event.target.files);
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };


  const handleCheckboxChange = (e: any, userId: any) => {
    const isChecked = e.target.checked;
    setSelectedMembers(prevState => {
      if (isChecked) {
        // Add the selected user to the array
        return [...prevState, userId];
      } else {
        // Remove the deselected user from the array
        return prevState.filter(id => id !== userId);
      }
    });
  };
  return (
    <>
      <div className="main-content userprofile-part" id='your-element-id1'>
        <div className="page-content">
          <div className="container-fluid">
            <div className="page-title-box">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="table-part">
                    <h2>Chats</h2>

                    <div className="chats-box">
                      <div className="d-flex">
                        <div className="users-all">
                          <div className="chats-btns mt-4">
                            <form className="form-Search">
                              {/* <input
                              type="text"
                              name="starter"
                              //value={searchInputValue} onChange={handleSearchInputChange}
                              placeholder="Search user and chef by name.."
                              className="mb-4"
                              required
                          /> */}
                            </form>
                            {/* <div className="position-relative">
                            <div className="" id="compare_countries_result">
                                      {searchInputValue && renderSearchResults()}
                            </div>
                          </div> */}

                            <ul className="table_header_button_section p-r">
                              <li>
                                <button
                                  className={`${activeButton === 'desc' ? 'table-btn' : 'table-btn btn-2'}`}
                                  onClick={() => handleFilterButtonClick('desc')}
                                >
                                  Recent
                                </button>
                              </li>
                              <li>
                                <button
                                  className={`${activeButton === 'asc' ? 'table-btn' : 'table-btn btn-2'}`}
                                  onClick={() => handleFilterButtonClick('asc')}
                                >
                                  Oldest
                                </button>
                              </li>
                              <li>
                                <button
                                  className={`${activeButton === 'unread' ? 'table-btn' : 'table-btn btn-2'}`}
                                  onClick={() => handleFilterButtonClick('unread')}
                                >
                                  Unread
                                </button>
                              </li>
                              {/* <li className="right-li" onClick={() => creategroupchat()}><i className="fa-solid fa-plus"></i></li> */}
                            </ul>
                          </div>
                          <div className="chats-h">
                            <div className="chats-user-profile mt-1">

                              {
                                adminchatsidebar.length > 0 ? (
                                  adminchatsidebar.map((message, index: number) => {
                                    // Convert the latest_created_at to the specified time zone
                                    const formattedDate = message.latest_created_at;

                                    return (
                                      <a href="#" className={`chats-user-a ${activeChat === index ? 'chatactive' : ''}`} onClick={() => handleButtonClick(index, message.latest_chat_type, message.sender_id, message.receiver_id, currentUserData.id, message.group_id, message.group_name, message.single_chat_id, message.sender_name, message.receiver_name)} key={index}>
                                        <div className="row p-2">

                                          {message.latest_chat_type == 'single' && (
                                            <div className="col-lg-3 col-md-3 col-3 pr-0">
                                              <div className="position-relative">
                                                {message.profile_pic == null ? (
                                                  <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="chats-user" height={38} width={38} />
                                                ) : (
                                                  <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/profile/' + message.sender_pic} alt="chats-user" height={38} width={38} />
                                                )}
                                                {message.is_online == 'yes' && (<i className="position-absolute  fa-solid fa-circle chats-circle user_chat_online_circle text-success"></i>)}
                                              </div>
                                            </div>
                                          )}

                                          {message.latest_chat_type == 'booking' && (
                                            <div className="col-lg-3 col-md-3 col-3 pr-0" id="booking_images">

                                              {message.sender_pic == null ? (
                                                <Image height={38} width={38} src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="chats-user" className="sender_booking_pic" />
                                              ) : (
                                                <Image height={38} width={38} src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/profile/' + message.sender_pic} alt="chats-user" className="sender_booking_pic" />
                                              )}

                                              {message.recevier_pic == null ? (
                                                <Image height={38} width={38} src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="chats-user" className="receive_booking_pic" />
                                              ) : (
                                                <Image height={38} width={38} src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/profile/' + message.recevier_pic} alt="chats-user" className="receive_booking_pic" />
                                              )}


                                            </div>
                                          )}


                                          {message.latest_chat_type == 'group' && (
                                            <div className="col-lg-3 col-md-3 col-3 pr-0">
                                              {message.group_image == null ? (
                                                <Image height={51} width={51} src={process.env.NEXT_PUBLIC_BASE_URL + 'assets/images/group_chat_2.png'} alt="chats-user" />
                                              ) : (
                                                <Image height={51} width={51} src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/group/' + message.group_image} alt="chats-user" />
                                              )}

                                            </div>
                                          )}


                                          <div className="col-lg-9 col-md-7 col-7">
                                            <div className="user-profile-chats mt-1">
                                              {message.latest_chat_type == 'single' && (
                                                <h5 className={`chat_color position-relative ${activeChat === index ? 'text-white' : ''}`}>
                                                  {
                                                    currentUserData.role === message.sender_role ? (
                                                      <>
                                                        {message.receiver_name && message.receiver_name.length > 25 ? (
                                                          <span>
                                                            {message.receiver_name.slice(0, 25)}...
                                                          </span>
                                                        ) : (
                                                          <span>
                                                            {message.receiver_name}
                                                          </span>
                                                        )}
                                                        {Number(message.unreadcount) > 0 && (
                                                          <span className={`chat_color badge text-danger position-absolute mx-2 chat_badge ${activeChat === index ? 'bg-white' : 'text-white bg-secondary'}`}>
                                                            {message.unreadcount}
                                                          </span>
                                                        )}
                                                      </>
                                                    ) : (
                                                      <>
                                                        {message.sender_name && message.sender_name.length > 25 ? (
                                                          <span>
                                                            {message.sender_name.slice(0, 25)}...
                                                          </span>
                                                        ) : (
                                                          <span>
                                                            {message.sender_name}
                                                          </span>
                                                        )}
                                                        {Number(message.unreadcount) > 0 && (
                                                          <span className={`chat_color badge text-danger position-absolute mx-2 chat_badge ${activeChat === index ? 'bg-white' : 'text-white bg-secondary'}`}>
                                                            {message.unreadcount}
                                                          </span>
                                                        )}
                                                      </>
                                                    )
                                                  }


                                                </h5>
                                              )}

                                              {message.latest_chat_type == 'group' && (
                                                <h5 className={`chat_color position-relative ${activeChat === index ? 'text-white' : ''}`}>
                                                  {message.group_name && message.group_name.length > 25 ? `${message.group_name.slice(0, 25)}...` : message.group_name} (Group)
                                                  {/* {Number(message.unreadcount) > 0 && (
                                                        <span className={`chat_color badge text-danger position-absolute mx-2 chat_badge ${activeChat === index ? 'bg-white' : 'text-white bg-secondary'}`}>
                                                          {message.unreadcount}
                                                        </span>
                                                      )} */}
                                                </h5>
                                              )}

                                              {message.latest_type == 'image' && <div className="image_sider_bar d-flex align-items-center"> <Image
                                                src={process.env.NEXT_PUBLIC_BASE_URL + 'assets/images/small_image.png'}
                                                className="sidebar_chat_border rounded"
                                                width={30} height={30}
                                                alt="chats-user"
                                              /><span className="small_font mx-2 text-secondary">image</span></div>}

                                              {message.latest_type == 'pdf' && <div className="image_sider_bar d-flex align-items-center"> <Image
                                                src={process.env.NEXT_PUBLIC_BASE_URL + 'assets/images/small_pdf.png'}
                                                className="sidebar_chat_border rounded"
                                                width={30} height={30}
                                                alt="chats-user"
                                              /><span className="small_font mx-2 text-secondary">Pdf</span></div>}

                                              {message.latest_type == 'video' && <div className="image_sider_bar d-flex align-items-center"> <Image
                                                src={process.env.NEXT_PUBLIC_BASE_URL + 'assets/images/small_video.png'}
                                                className="sidebar_chat_border rounded"
                                                width={30} height={30}
                                                alt="chats-user"
                                              /><span className="small_font mx-2 text-secondary">video</span></div>}

                                              {message.latest_type !== 'image' && message.latest_type !== 'pdf' && message.latest_type !== 'video' && (
                                                <p className="chat_color mb-0">
                                                  {message.latest_message && message.latest_message.length > 40 ? `${message.latest_message.slice(0, 40)}...` : message.latest_message}
                                                </p>
                                              )}


                                            </div>
                                            <p className={`chat_color f-12 ${activeChat === index ? 'text-white' : ''}`}>
                                              {formattedDate}
                                            </p>
                                          </div>

                                        </div>
                                      </a>
                                    );
                                  })
                                ) : (
                                  <p>No messages found.</p>
                                )
                              }


                            </div>
                          </div>
                        </div>
                        <div className="users-chats">
                          <div className="msg-head">
                            <div className="row">
                              <div className="col-lg-8 col-md-8 col-8">
                                <h3>
                                  {
                                    adminchatsidebar.length > 0 && chat_type == 'group'
                                      ? chat_group_name + '(Group)'
                                      : chat_single_name
                                  }
                                </h3>
                              </div>
                              <div className="col-lg-4 col-md-4 col-4 text-right">
                                <div className="icon-head-chats">
                                  {/* <a href="#">
                                    <i className="fa-solid fa-pen"></i>
                                  </a> */}
                                  {/* <a href="#">
                                    <i className="fa-solid fa-circle-info"></i>
                                  </a> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="msg-body" id="messages_chat_section">
                            <div className="user-box">

                              <ul className="user-mess" ref={userMessRef}>
                                {adminuserchefmesage.length > 0 ? (
                                  adminuserchefmesage.map((message, index) => (
                                    <React.Fragment key={index}>
                                      {message.sender_role == 'startup' && (
                                        <li className="reply-two">
                                          <span className="bg-f1">
                                            {message.message_attachment_type === 'image' && <a href={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/images/' + message.message_attachment} target="_blank" rel="noopener noreferrer">  <Image
                                              src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/images/' + message.message_attachment}
                                              className="chat_shared_image"
                                              width={150} height={150}
                                              alt="chats-user"
                                            /></a>}
                                            {message.message_attachment_type === 'pdf' && (
                                              <a href={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/pdf/' + message.message_attachment} target="_blank" rel="noopener noreferrer">  <Image
                                                src={process.env.NEXT_PUBLIC_BASE_URL + 'assets/images/pdf.png'}
                                                className="chat_shared_image"
                                                alt="chats-user"
                                                width={128} height={128}
                                              /></a>
                                            )}

                                            {message.message_attachment_type === 'video' && (
                                              <a href={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/video/' + message.message_attachment} target="_blank" rel="noopener noreferrer">
                                                <video className="chat_shared_video" controls width={150} height={150}>
                                                  <source src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/video/' + message.message_attachment} type="video/mp4" />
                                                  Your browser does not support the video tag.
                                                </video>
                                              </a>
                                            )}

                                            {message.message_attachment_type !== 'image' && message.message_attachment_type !== 'pdf' && message.message_attachment_type !== 'video' && message.message}

                                            <div className="mt-2 small_font">  {formatDate(message.chatdate)}  </div>
                                          </span>{" "}
                                          {message.sender_pic == null ? <Image height={38} width={38}
                                            src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'}
                                            alt="chats-user"
                                          /> : <Image height={38} width={38}
                                            src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/profile/' + message.sender_pic}
                                            alt="chats-user"
                                          />}
                                          <div className="mt-2 small_font name_chat_two">You</div>
                                        </li>
                                      )}

                                      {(message.sender_role == 'investor' || message.sender_role == 'admin') && (
                                        <li className="reply">
                                          {message.sender_pic == null ? <Image height={51} width={51}
                                            src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'}
                                            alt="chats-user"
                                          /> : <Image height={51} width={51}
                                            src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/profile/' + message.sender_pic}
                                            alt="chats-user"
                                          />}
                                          <span className="bg-f1">
                                            {message.message_attachment_type === 'image' && <a href={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/images/' + message.message_attachment} target="_blank" rel="noopener noreferrer">  <Image
                                              src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/images/' + message.message_attachment}
                                              className="chat_shared_image"
                                              width={128} height={128}
                                              alt="chats-user"
                                            /></a>}
                                            {message.message_attachment_type === 'pdf' && (
                                              <a href={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/pdf/' + message.message_attachment} target="_blank" rel="noopener noreferrer">  <Image
                                                src={process.env.NEXT_PUBLIC_BASE_URL + 'assets/images/pdf.png'}
                                                className="chat_shared_image"
                                                alt="chats-user"
                                                width={128} height={128}
                                              /></a>
                                            )}
                                            {message.message_attachment_type === 'video' && (
                                              <a href={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/video/' + message.message_attachment} target="_blank" rel="noopener noreferrer">
                                                <video className="chat_shared_video" controls width={150} height={150}>
                                                  <source src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/video/' + message.message_attachment} type="video/mp4" />
                                                  Your browser does not support the video tag.
                                                </video>
                                              </a>
                                            )}
                                            {message.message_attachment_type !== 'image' && message.message_attachment_type !== 'pdf' && message.message_attachment_type !== 'video' && message.message}

                                            <div className="mt-2 small_font">  {formatDate(message.chatdate)}  </div>
                                          </span>{" "}
                                          <div className="mt-2 small_font name_chat">
                                            {message && message.sender_name && message.sender_name.length > 8 ? (
                                              message.sender_name.substring(0, 8) + ''
                                            ) : (
                                              message && message.sender_name
                                            )}
                                          </div>
                                        </li>)}
                                    </React.Fragment>
                                  ))
                                ) : (
                                  <p>No messages found.</p>
                                )}
                              </ul>
                            </div>
                            {adminchatsidebar.length > 0 && (
                              <div className="send-box">
                                <form onSubmit={handleBookingAssignJobSubmit} className="form-Search send-message">
                                  <div className="row">
                                    <div className="col-sm-10 col-9">

                                      <input
                                        type="text"
                                        placeholder="Write a message"
                                        value={message} onChange={(e) => setMessage(e.target.value)} onBlur={handleRegisterBlur}
                                      />
                                      {errors.message && <span className="small error text-danger mb-2 d-inline-block error_login ">{errors.message}</span>}
                                    </div>
                                    <div className="col-sm-2 col-3">
                                      <div className="send-part">
                                        <button type="submit" className="chat_msg_send">
                                          <i className="fa-solid fa-paper-plane"></i>

                                        </button>
                                        <label className="mx-2"> <input
                                          type="file"
                                          name="image"
                                          id="uploadfile"
                                          className="d-none"
                                          onChange={imageChange}
                                        /> <i className="fa-solid fa-paperclip" style={{ color: '#088395' }} role="button"></i>
                                        </label>
                                      </div>

                                    </div>
                                  </div>
                                </form>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="users-groups">

                          <ul className="nav nav-pills mt-3 mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Chat Members</button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"> Shared file</button>
                            </li>
                          </ul>
                          <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                              <div className="sp-4">
                                {chat_type === 'booking' && adminuserchefmesage.length > 0 && (
                                  <>
                                    {adminuserchefmesage.slice(0, 1).map((message, index) => (
                                      <React.Fragment key={index}>
                                        {message.sender_role === 'investor' && (
                                          <p className="g-text">
                                            {message.sender_pic == null ? (
                                              <Image height={38} width={38}
                                                src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'}
                                                alt="chats-user"
                                              />
                                            ) : (
                                              <Image height={38} width={38}
                                                src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/profile/' + message.sender_pic}
                                                alt="chats-user"
                                              />
                                            )}
                                            <span>
                                              {message.sender_name && message.sender_name.length > 25
                                                ? `${message.sender_name.slice(0, 25)}...`
                                                : message.sender_name} ({message.sender_role})
                                            </span>
                                          </p>
                                        )}

                                        {message.receiver_role === 'startup' && (
                                          <p className="g-text">
                                            {message.receiver_pic == null ? (
                                              <Image height={38} width={38}
                                                src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'}
                                                alt="chats-user"
                                              />
                                            ) : (
                                              <Image height={38} width={38}
                                                src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/profile/' + message.receiver_pic}
                                                alt="chats-user"
                                              />
                                            )}
                                            <span>
                                              {message.receiver_name && message.receiver_name.length > 25
                                                ? `${message.receiver_name.slice(0, 25)}...`
                                                : message.receiver_name} ({message.receiver_role})
                                            </span>
                                          </p>
                                        )}
                                      </React.Fragment>
                                    ))}
                                  </>
                                )}


                                {chat_type == 'single' && adminuserchefmesage.length > 0 && (
                                  <>
                                    {adminuserchefmesage.slice(0, 1).map((message, index) => (
                                      <React.Fragment key={index}>

                                        {(message.sender_role === 'admin') && (
                                          <p className="g-text">
                                            {message.sender_pic == null ? (
                                              <Image height={38} width={38}
                                                src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'}
                                                alt="chats-user"
                                              />
                                            ) : (
                                              <Image height={38} width={38}
                                                src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/profile/' + message.sender_pic}
                                                alt="chats-user"
                                              />
                                            )}
                                            <span>
                                              {message.sender_name && message.sender_name.length > 25
                                                ? `${message.sender_name.slice(0, 25)}...`
                                                : message.sender_name} ({message.sender_role})
                                            </span>
                                          </p>
                                        )}

                                        {(message.receiver_role === 'investor' || message.receiver_role === 'startup') && (
                                          <p className="g-text">
                                            {message.receiver_pic == null ? (
                                              <Image height={38} width={38}
                                                src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'}
                                                alt="chats-user"
                                              />
                                            ) : (
                                              <Image height={38} width={38}
                                                src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/profile/' + message.receiver_pic}
                                                alt="chats-user"
                                              />
                                            )}
                                            <span>
                                              {message.receiver_name && message.receiver_name.length > 25
                                                ? `${message.receiver_name.slice(0, 25)}...`
                                                : message.receiver_name} ({message.receiver_role})
                                            </span>
                                          </p>
                                        )}



                                      </React.Fragment>
                                    ))}
                                  </>
                                )}

                                {chat_type == 'group' && chatgroupmember.length > 0 && (
                                  <>
                                    {chatgroupmember.map((message, index) => (
                                      <React.Fragment key={index}>
                                        <p className="g-text">
                                          {message.profile_pic == null ? (
                                            <Image height={38} width={38}
                                              src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'}
                                              alt="chats-user"
                                            />
                                          ) : (
                                            <Image height={38} width={38}
                                              src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/profile/' + message.profile_pic}
                                              alt="chats-user"
                                            />
                                          )}


                                          <span>
                                            {message.name && message.name.length > 25
                                              ? `${message.name.slice(0, 25)}...`
                                              : message.name} {(message.group_admin_id !== message.user_id) && (
                                                <>
                                                  {message.role && (
                                                    <>
                                                      {'('}{message.role}{')'}
                                                    </>
                                                  )}
                                                </>
                                              )}

                                            {message.group_admin_id == message.user_id && (' (Group admin)')}
                                          </span>

                                        </p>

                                      </React.Fragment>
                                    ))}
                                  </>
                                )}


                              </div>

                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                              <div className="sp-4 tab_share_file">
                                <ul className="user-mess" id="asd">
                                  {
                                    adminuserchefmesage.some((message) => message.type !== null) ? (
                                      <>
                                        {adminuserchefmesage
                                          .filter((message) => message.type !== null && message.chatdate)
                                          .sort((a, b) => {
                                            const dateA = new Date(a.chatdate as string);
                                            const dateB = new Date(b.chatdate as string);
                                            return dateB.getTime() - dateA.getTime();
                                          })
                                          .map((message, index) => (
                                            <React.Fragment key={index}>
                                              <li className="reply new_reply_msg d-flex align-items-center">
                                                <span>
                                                  {message.message_attachment_type === 'image' && (
                                                    <a
                                                      href={
                                                        process.env.NEXT_PUBLIC_IMAGE_URL +
                                                        '/images/chat/images/' +
                                                        message.message
                                                      }
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                    >
                                                      <Image
                                                        src={
                                                          process.env.NEXT_PUBLIC_IMAGE_URL +
                                                          '/images/chat/images/' +
                                                          message.message_attachment
                                                        }
                                                        className="chat_shared_image"
                                                        width={128}
                                                        height={128}
                                                        alt="chats-user"
                                                      />
                                                    </a>
                                                  )}
                                                  {message.message_attachment_type === 'pdf' && (
                                                    <a
                                                      href={
                                                        process.env.NEXT_PUBLIC_IMAGE_URL +
                                                        '/images/chat/pdf/' +
                                                        message.message_attachment
                                                      }
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                    >
                                                      <Image
                                                        src={process.env.NEXT_PUBLIC_BASE_URL + 'assets/images/pdf.png'}
                                                        className="chat_shared_image"
                                                        alt="chats-user"
                                                        width={128}
                                                        height={128}
                                                      />
                                                    </a>
                                                  )}
                                                  {message.message_attachment_type === 'video' && (
                                                    <a href={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/video/' + message.message_attachment} target="_blank" rel="noopener noreferrer">
                                                      <video className="chat_shared_video" controls width={150} height={150}>
                                                        <source src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/video/' + message.message_attachment} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                      </video>
                                                    </a>
                                                  )}
                                                </span>

                                                <span className="mx-2 small_font">
                                                  {message.sender_role == 'investor' || message.sender_role == 'startup' || message.sender_role == 'admin'
                                                    ? (message.sender_name.length <= 10 ? message.sender_name : message.sender_name.substring(0, 10) + '...')
                                                    : ''
                                                  }
                                                  <div className="mt-2 small_font">{message.chatdate}</div>
                                                </span>
                                              </li>
                                            </React.Fragment>
                                          ))}
                                        {adminuserchefmesage.filter((message) => message.type !== null && message.chatdate).length === 0 && (
                                          <p>No data found.</p>
                                        )}
                                      </>
                                    ) : (
                                      <p>No data found.</p>
                                    )
                                  }


                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <PopupModalTwo show={modalConfirmTwo} handleClose={modalConfirmCloseTwo} staticClass="var-login">
              <div className="all-form" >
                <form onSubmit={handlMessageSubmit} className="common_form_error" id="menu_form">
                  <div className='login_div'>
                    <label htmlFor="name">Message:</label>
                    <textarea name="chatmessage" value={chatmessage} onChange={(e) => setChatMessage(e.target.value)} onBlur={handleMessageBlur}></textarea>
                    {errors.chatmessage && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.chatmessage}</span>}
                  </div>
                  <button type="submit" className="btn-send w-100 mt-3">Submit</button>
                </form>
              </div>
            </PopupModalTwo>
            <PopupModalLarge show={modalConfirm} handleClose={modalConfirmClose} staticClass="var-login">

              <div className="all-form" >
                <form onSubmit={handlGroupSubmit} className="common_form_error" id="menu_form">
                  <div className='login_div'>
                    <label htmlFor="name">Group Name:</label>
                    <input type="text" name='groupname' value={groupname} onChange={(e) => setGroupName(e.target.value)} />
                    {errors.groupname && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.groupname}</span>}
                  </div>
                  <div className='login_div'>
                    <label htmlFor="name">Message:</label>
                    <input type="text" name='groupmessage' value={groupmessage} onChange={(e) => setGroupMessage(e.target.value)} />
                    {errors.groupmessage && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.groupmessage}</span>}
                  </div>
                  <div className="container p-0 login_div">
                    <div className="row">
                      <div className="col-6">
                        <label className="mb-3 mt-1" htmlFor="Image">Select User:</label>
                        {Array.isArray(userdata) && userdata.filter(user => user.role === 'user').length > 0 ? (
                          userdata.filter(user => user.role === 'user').map((user, index) => (
                            <div className="checkbox d-flex" key={index}>
                              <input id={`flexCheckDefault${index}`} value="4" name="member_ids[]" type="checkbox" onChange={(e) => handleCheckboxChange(e, user.id)} />
                              <label className="col-11" htmlFor={`flexCheckDefault${index}`}>
                                <span className="mx-2">{user.name}</span>
                              </label>
                            </div>
                          ))
                        ) : (
                          <p className="mt-2">No data found</p>
                        )}
                      </div>
                      <div className="col-6">
                        <label className="mb-3 mt-1" htmlFor="Image">Select chef:</label>
                        {Array.isArray(userdata) && userdata.filter(user => user.role === 'chef').length > 0 ? (
                          userdata.filter(user => user.role === 'chef').map((user, index) => (
                            <div className="checkbox d-flex" key={index}>
                              <input id={`flexCheckDefaultnew${index}`} value="4" name="member_ids[]" type="checkbox" onChange={(e) => handleCheckboxChange(e, user.id)} />
                              <label className="col-11" htmlFor={`flexCheckDefaultnew${index}`}>
                                <span className="mx-2">{user.name}</span>
                              </label>
                            </div>
                          ))
                        ) : (
                          <p className="mt-2">No data found</p>
                        )}
                        {errors.groupmember && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.groupmember}</span>}
                      </div>
                    </div>
                  </div>
                  <div className='login_div mt-3'>
                    <label htmlFor="Image">Group Image:</label>
                    <input type="file" name="image" accept="jpg,png" onChange={handleImageChange} />
                    {previewImage && (
                      <div className="image_preview mb-4 d-block">
                        <Image src={previewImage} alt="Preview" width={100} height={100} style={{ width: "20%", height: "100px" }} />
                      </div>
                    )}
                  </div>
                  <div className="image_preview mb-4 d-none">
                    {previewimage && (
                      <Image src={previewimage} alt="Preview" width={100} height={100} />
                    )}
                  </div>
                  <button type="submit" className="btn-send mt-3 float-end" >Create</button>
                </form>
              </div>
            </PopupModalLarge>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}
