<template>
    <div>
        <PageHeader :icon="'ri-shield-user-line h2'" :title="title" :items="items" />
        <div class="d-flex align-items-center mb-3">
            <!-- <i class="d-inline-block mdi mdi-account-circle cmh-icon"></i>
            <h1 class="d-inline-block cmh-title">My Profile</h1> -->
            <b-button class="puser-btn" variant="primary" size="md"
                style="display: inline; float: right; margin-left: auto;" v-on:click="openChangePasswordModel()">
                Change Password
            </b-button>
        </div>

        <div class="card">
            <div class="card-body">
                <simplebar>
                    <span class="text-reset notification-item notification-item-customcls">
                        <div class="media border-bottom">
                            <div class="media-body">
                                <h6 class="mt-0 mb-1">Name</h6>
                                <div class="font-size-14">
                                    <p class="mb-1">{{ uname }}</p>
                                </div>
                            </div>
                        </div>
                    </span>
                    <span href class="text-reset notification-item notification-item-customcls">
                        <div class="media border-bottom">
                            <div class="media-body">
                                <h6 class="mt-0 mb-1">Email Address</h6>
                                <div class="font-size-14">
                                    <p class="mb-1">{{ email }}</p>
                                </div>
                            </div>
                        </div>
                    </span>
                </simplebar>
            </div>
        </div>

        <div>
            <div class="my-4 text-center">
                <b-modal id="modal-standard" ref="changePasswordModel" title="Change Password" title-class="font-18"
                    hide-footer>
                    <div class="row">
                        <div class="col-lg-12">
                            <form class="form-horizontal" @submit.prevent="changePassword" ref="form">
                                <div class="form-group">
                                    <label for="password">New Password</label>
                                    <input v-validate="'required|verify_password'" v-model="password" name="password"
                                        type="password" class="form-control" id="password" placeholder="Enter new password"
                                        :class="{
                                            'is-invalid': submitted && $v.password.$error,
                                        }" ref="password" />
                                    <p class="text-danger text-sm"
                                        v-show="errors.has('password') && _.find(errors.items, { field: 'password' }).rule == 'required'">
                                        <span>The new password field is required</span>
                                    </p>
                                    <p class="text-danger text-sm"
                                        v-show="errors.has('password') && _.find(errors.items, { field: 'password' }).rule == 'verify_password'">
                                        {{ errors.first("password") }}
                                    </p>
                                </div>
                                <div class="form-group">
                                    <label for="confirmPassword">Confirm Password</label>
                                    <input v-validate="'required|confirmed:password'" v-model="password_confirmation"
                                        name="password_confirmation" type="password" class="form-control"
                                        id="password_confirmation" placeholder="Enter password" :class="{
                                            'is-invalid': submitted && $v.password_confirmation.$error,
                                        }" />
                                    <p class="text-danger text-sm" v-show="errors.has('password_confirmation')">
                                        The password confirmation field does not match
                                    </p>
                                </div>
                                <div class="text-center">
                                    <button class="btn btn-primary w-md waves-effect waves-light" type="submit">
                                        Save
                                    </button>
                                    &nbsp;&nbsp;
                                    <b-button class="btn btn-secondry w-md waves-effect waves-light"
                                        v-on:click="closeChangePasswordModel()">Cancel</b-button>
                                </div>
                            </form>
                        </div>
                    </div>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
import VeeValidate from "vee-validate";
import _ from "lodash";
import simplebar from "simplebar-vue";
import PageHeader from "@/components/page-header";
export default {
    components: { PageHeader, simplebar },
    data() {
        return {
            title: "My Profile",
            items: [
                {
                    text: "Dashboard",
                    href: "/"
                },
                {
                    text: "My Profile",
                    active: true
                }
            ],
            password: null,
            password_confirmation: null,
            error: null,
            submitted: false,
            uname: "",
            email: "",
        };
    },
    created() {
        this.getProfileData();
        VeeValidate.Validator.extend('verify_password', {
            getMessage: () => `The password must contain at least: minimum 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`,
            validate: value => {
                var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})");
                return strongRegex.test(value);
            }
        });
    },
    computed: {
        _() {
            return _;
        },
    },
    beforeDestroy() {
        this.$validator.resume();
    },
    methods: {
        // This method is use to generate error or success message
        messageToast(messageToastTitle, messageToastVariant, messageToastContent) {
            this.$bvToast.toast(messageToastContent, {
                title: messageToastTitle,
                variant: messageToastVariant,
                solid: true,
            });
        },
        getProfileData() {
            let loader = this.$loading.show({
                loader: "dots",
            });
            this.$store.getters.client.get(`serveradmin/byid?seradminId=${this.$store.state.Auth.id}`).then((response) => {
                console.log(response)
                this.uname = response.data.username;
                this.email = response.data.email;
                loader.hide();
            });
        },
        openChangePasswordModel() {
            this.$refs["changePasswordModel"].show();
        },
        closeChangePasswordModel() {
            // Resetting Values
            this.password = this.password_confirmation = "";
            this.$refs.form.reset();
            this.$refs["changePasswordModel"].hide();
        },
        changePassword() {
            console.log(this.$store.state.Auth.id)
            this.$validator.validateAll().then((result) => {
                if (result) {
                    let loader = this.$loading.show({
                        loader: "dots",
                    });
                    this.$store.getters.client
                        .put(`/serveradmin/changepassword/byserveradminid`, {
                            orgServerAdminId: this.$store.state.Auth.id,
                            password: this.password
                        })
                        .then(() => {
                            // Resetting Values
                            this.password = this.password_confirmation = "";
                            this.$refs.form.reset();
                            this.messageToast("Success", "success", `Password reset successfully`);
                            loader.hide();
                            this.$refs["changePasswordModel"].hide();
                        })
                        .catch((error) => {
                            this.messageToast("Error", "danger", error.response.data.message);
                            loader.hide();
                        });
                }
            });
        }
    },
};
</script>

<style>
.btn-primary {
    background: #021559 !important;
    border: #021559 !important;
}

.notification-item .media:hover {
    background-color: unset;
}

.notification-item-customcls .media:hover {
    background-color: unset !important;
}

.notification-item-customcls .media {
    border-bottom: #f1f5f7 2px solid;
}

.notification-item-customcls:last-child .media {
    border-bottom: none;
}

.btn-container {
    margin: auto;
}

.custcls-input {
    padding-left: 0px !important;
}

.cmh-title {
    color: #021559;
    font-size: 20px;
    vertical-align: text-bottom;
    padding-left: 10px;
    font-weight: 600;
    margin-bottom: 0px;
}

.cmh-icon {
    color: #021559;
    font-size: 35px;
}
</style>